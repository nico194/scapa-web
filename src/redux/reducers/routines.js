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

const initialState = {
  loadingRoutines: false,
  err: null,
  routines: [],
  changed: false,
};

const routinesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ROUTINES_PENDING:
      return {
        ...state,
        loadingRoutines: true,
      };
    case FETCH_ROUTINES_ERROR:
    case ADD_ROUTINE_ERROR:
    case UPDATE_ROUTINE_ERROR:
    case DELETE_ROUTINE_ERROR:
      return {
        ...state,
        loadingRoutines: false,
        err: payload.err,
      };
    case FETCH_ROUTINES_SUCCESS:
      return {
        ...state,
        loadingRoutines: false,
        routines: payload.routines,
        changed: false,
      };
    case ADD_ROUTINE_SUCCESS:
      return {
        ...state,
        loadingRoutines: false,
        routines: state.routines.concat(payload.routine),
        changed: true,
      };
    case UPDATE_ROUTINE_SUCCESS:
      return {
        ...state,
        loadingRoutines: false,
        routines: state.routines.map((routine) =>
          routine.id === payload.routine.id
            ? {
                ...routine,
                descripción: payload.routine.descripción,
                phrase: payload.routine.phrase,
              }
            : routine
        ),
        changed: true,
      };
    case DELETE_ROUTINE_SUCCESS:
      return {
        ...state,
        loadingRoutines: false,
        routines: state.routines.filter(
          (routine) => routine.id !== payload.routine.id
        ),
      };
    case CLEAR_ERROR: {
      return {
        ...state,
        err: null,
      };
    }
    default:
      return state;
  }
};

export default routinesReducer;
