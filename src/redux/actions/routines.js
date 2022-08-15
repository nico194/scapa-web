import {
  FETCH_ROUTINES_PENDING,
  FETCH_ROUTINES_SUCCESS,
  FETCH_ROUTINES_ERROR,
  ADD_ROUTINE_SUCCESS,
  ADD_ROUTINE_ERROR,
  UPDATE_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_ERROR,
  DELETE_ROUTINE_SUCCESS,
  DELETE_ROUTINE_ERROR,
  CLEAR_ERROR,
} from '../constants/routines';
import axiosConfig from '../../configs/axios';

export const getRoutines = ({ accessToken, client, uid }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ROUTINES_PENDING });
    const headers = {
      headers: {
        'access-token': accessToken,
        client,
        uid,
      },
    };
    try {
      const routines = await getPhrasesFromAPI('routines', headers);
      return dispatch({ type: FETCH_ROUTINES_SUCCESS, payload: { routines } });
    } catch (err) {
      return dispatch({
        type: FETCH_ROUTINES_ERROR,
        payload: { err: err.response.data.error },
      });
    }
  };
};

export const getPhrasesFromAPI = async (source, headers) => {
  let phrases = [];
  try {
    const response = await axiosConfig.get(`/admin/${source}`, headers);
    const { data } = response.data;
    if (data.length > 0) {
      phrases = await Promise.all(
        data.map(async (phrase) => {
          const id = phrase.id;
          const type = phrase.type;
          const description = phrase.attributes.description;
          const pictograms = await getPictogramsFromAPhrase(phrase, headers);
          return {
            id,
            type,
            description,
            pictograms,
          };
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
  return phrases;
};

const getPictogramInPhrase = async (id, headers) => {
  let response;
  let pictogram;
  try {
    response = await axiosConfig.get(`/admin/pictograms/${id}`, headers);
    pictogram = response.data.data;
  } catch (error) {
    console.log('err', error);
  }
  return pictogram;
};

const getPictogramsFromAPhrase = async (phrase, headers) => {
  let pictograms = [];
  try {
    pictograms = await Promise.all(
      phrase.relationships.pictograms.data.map(async (pictogram) => {
        const pictogramInPhrase = await getPictogramInPhrase(
          pictogram.id,
          headers
        );
        return pictogramInPhrase;
      })
    );
  } catch (error) {
    console.log(error);
  }
  return pictograms;
};

export const addRoutine = (phraseToAdd, { accessToken, client, uid }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ROUTINES_PENDING });
    const headers = {
      headers: {
        'access-token': accessToken,
        client,
        uid,
      },
    };
    const phraseRequest = {
      routine: {
        description: phraseToAdd.description,
        pictogram_ids: phraseToAdd.pictograms.map((pictogram) => pictogram.id),
      },
    };
    try {
      const response = await axiosConfig.post(
        '/admin/routines',
        JSON.stringify(phraseRequest),
        headers
      );
      const routine = {
        ...phraseToAdd,
        id: response.data.data.id,
        type: response.data.data.type,
      };
      return dispatch({ type: ADD_ROUTINE_SUCCESS, payload: { routine } });
    } catch (err) {
      return dispatch({
        type: ADD_ROUTINE_ERROR,
        payload: { err: err.response.data.error },
      });
    }
  };
};

export const updateRoutine = (phraseToEdit, { accessToken, client, uid }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ROUTINES_PENDING });
    const headers = {
      headers: {
        'access-token': accessToken,
        client,
        uid,
      },
    };
    const phraseRequest = {
      routine: {
        description: phraseToEdit.description,
        pictogram_ids: phraseToEdit.pictograms.map((pictogram) => pictogram.id),
      },
    };
    try {
      const response = await axiosConfig.put(
        `/admin/routines/${phraseToEdit.id}`,
        JSON.stringify(phraseRequest),
        headers
      );
      const routine = {
        ...phraseToEdit,
        id: response.data.data.id,
        type: response.data.data.type,
      };
      return dispatch({ type: UPDATE_ROUTINE_SUCCESS, payload: { routine } });
    } catch (err) {
      return dispatch({
        type: UPDATE_ROUTINE_ERROR,
        payload: { err: err.response.data.error },
      });
    }
  };
};

export const deleteRoutine = (phraseToDelete, { accessToken, client, uid }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ROUTINES_PENDING });
    const headers = {
      headers: {
        'access-token': accessToken,
        client,
        uid,
      },
    };
    try {
      const response = await axiosConfig.delete(
        `/admin/routines/${phraseToDelete.id}`,
        headers
      );
      const routine = response.data.data;
      return dispatch({ type: DELETE_ROUTINE_SUCCESS, payload: { routine } });
    } catch (err) {
      return dispatch({
        type: DELETE_ROUTINE_ERROR,
        payload: { err: err.response.data.error },
      });
    }
  };
};

export const clearError = () => (dispatch) => dispatch({ type: CLEAR_ERROR });
