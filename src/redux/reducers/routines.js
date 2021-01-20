import {
    FETCH_ROUTINES_PENDING,
    FETCH_ROUTINES_ERROR,
    SEND_ROUTINE,
    ACCEPT_ROUTINE
} from '../constants/routines';

const initialState = {
    loading: false,
    err: null,
    send: false
}

const routinesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ROUTINES_PENDING:
            return {
                ...state,
                loading: true
            }
        case FETCH_ROUTINES_ERROR:
            return {
                ...state,
                loading: false,
                error: payload.err
            }
        case SEND_ROUTINE:
            return {
                ...state,
                loading: false,
                send: true
            }
        case ACCEPT_ROUTINE: 
            return {
                ...state,
                send: false
            }
        default:
            return state;
    }
}

export default routinesReducer;