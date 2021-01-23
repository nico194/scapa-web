import {
    FETCH_PICTOGRAMS_PENDING,
    FETCH_PICTOGRAMS_ERROR,
    FETCH_PICTOGRAMS_SUCCESS,
    ADD_PICTOGRAM_SUCCESS,
    ADD_PICTOGRAM_ERROR,
    UPDATE_PICTOGRAM_SUCCESS,
    UPDATE_PICTOGRAM_ERROR,
    DELETE_PICTOGRAM_SUCCESS,
    DELETE_PICTOGRAM_ERROR,
    SELECT_PICTOGRAM_TO_PHRASE,
    UNSELECT_PICTOGRAM_TO_PHRASE
    } from '../constants/pictograms';
import axiosConfig from '../../configs/axios'

export const getPictograms = ({ accessToken, client, uid }, page = 1) => {
    return dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        axiosConfig.get(`/admin/pictograms?per_page=15&page=${page}`, headers )
            .then( response => 
                dispatch({ 
                    type: FETCH_PICTOGRAMS_SUCCESS, 
                    payload: { 
                        pictograms: response.data.data,
                        previousPage: response.data.meta.prev_page,
                        currentPage: response.data.meta.current_page ,
                        totalPage: response.data.meta.total_pages ,
                        nextPage: response.data.meta.next_page
                    }
                }))
            .catch( err => dispatch({ type: FETCH_PICTOGRAMS_ERROR, payload: {err}}));
    }
}

export const addPictogram = (pictogramToAdd , { accessToken, client, uid }) => {
    return dispatch => {
        //dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        const pictogram = {
            pictogram: {
                description: pictogramToAdd.attributes.description,
                category_id: pictogramToAdd.relationships.category.data.id
            }
        }
        axiosConfig.post('/admin/pictograms', JSON.stringify(pictogram), headers )
            .then( response => dispatch({ type: ADD_PICTOGRAM_SUCCESS, payload: {pictogram: response.data.data}}))
            .catch( err => dispatch({ type: ADD_PICTOGRAM_ERROR, payload: {err}}));
    }
}

export const deletePictogram = (id, { accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        axiosConfig.delete(`/admin/pictograms/${id}`, headers )
            .then( response => dispatch({ type: DELETE_PICTOGRAM_SUCCESS, payload: {pictogram: response.data.data}}))
            .catch( err => dispatch({ type: DELETE_PICTOGRAM_ERROR, payload: {err}}));
    }
}

export const updatePictogram = (pictogramToUpdate, { accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = {
            headers: {
                'access-token': accessToken,
                client,
                uid
            }
        }
        const pictogram = {
            pictogram: {
                description: pictogramToUpdate.attributes.description,
                category_id: pictogramToUpdate.relationships.category.data.id
            }
        }
        axiosConfig.put(`/admin/pictograms/${pictogramToUpdate.id}`, JSON.stringify(pictogram), headers)
            .then( response => dispatch({ type: UPDATE_PICTOGRAM_SUCCESS, payload: {pictogram: response.data.data}}))
            .catch( err => dispatch({ type: UPDATE_PICTOGRAM_ERROR, payload: {err}}));
    }
}

export const selectPictogramToPhrase = pictogram => {
    return dispatch => {
        dispatch({ type: SELECT_PICTOGRAM_TO_PHRASE, payload: {pictogram} })
    }
}

export const unselectPictogramToPhrase = index => {
    return dispatch => {
        dispatch({ type: UNSELECT_PICTOGRAM_TO_PHRASE, payload: {index} })
    }
}
