import {
    FETCH_ROUTINES_PENDING,
    FETCH_ROUTINES_SUCCESS,
    FETCH_ROUTINES_ERROR,    
    ADD_ROUTINE_SUCCESS,
    ADD_ROUTINE_EROOR,
} from '../constants/routines';

const initialState = {
    loading: false,
    err: null,
    routines: [],
    changed: false,
}

const routinesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ROUTINES_PENDING:
            return {
                ...state,
                loading: true
            }
        case ADD_ROUTINE_EROOR:
        case FETCH_ROUTINES_ERROR:
            return {
                ...state,
                loading: false,
                error: payload.err
            }
        case FETCH_ROUTINES_SUCCESS:
            return {
                ...state,
                loading: false,
                changed: false
            }
        case ADD_ROUTINE_SUCCESS:
            return {
                ...state,
                loading: false,
                routines: state.routines.concat(payload.routine),
                changed: true
            }
        default:
            return state;
    }
}

export default routinesReducer;