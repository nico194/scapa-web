import {
    FETCH_ROUTINES_PENDING,
    FETCH_ROUTINES_SUCCESS,
    FETCH_ROUTINES_ERROR,    
    ADD_ROUTINE_SUCCESS,
    ADD_ROUTINE_EROOR,
} from '../constants/routines';

export const getRoutine = () => {
    return dispatch => {
        dispatch({ type: FETCH_ROUTINES_SUCCESS });
    }
}

export const addRoutine = ( routine ) => {
    return dispatch => {
        dispatch({ type: ADD_ROUTINE_SUCCESS, payload: { routine } });
    }
}