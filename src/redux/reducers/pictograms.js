import { FETCH_PICTOGRAMS_PENDING,
         FETCH_PICTOGRAMS_ERROR,
         FETCH_PICTOGRAMS_SUCCESS, 
         FETCH_ADD_PICTOGRAM_SUCCESS,
         FETCH_UPDATE_PICTOGRAM_SUCCESS,
         FETCH_DELETE_PICTOGRAM_SUCCESS,
         SELECT_PICTOGRAM_TO_PHRASE,
         UNSELECT_PICTOGRAM_TO_PHRASE
  } from '../constants/pictograms';

const initialState = {
    add : false,
    edit: false,
    loading: false,
    pictograms: [],
    pictogramsSelected: [],
    err: null
}

function pictogramsReducer(state = initialState, {type, payload}) {
    switch(type) {
        case FETCH_PICTOGRAMS_PENDING: 
            return {
                ...state,
                loading: true
            }
        case FETCH_PICTOGRAMS_ERROR: {
            return {
                ...state,
                loading: false,
                err: payload.err
            }
        }
        case FETCH_PICTOGRAMS_SUCCESS: {
            return {
                ...state,
                loading: false,
                pictograms: payload.pictograms
            }
        }
        case FETCH_ADD_PICTOGRAM_SUCCESS: {
            return {
                ...state,
                pictograms: state.pictograms.concat(payload.pictogram)
            }
        }
        case FETCH_UPDATE_PICTOGRAM_SUCCESS: {
            const index = state.pictograms.findIndex(pictogram => pictogram.id === payload.id);
            state.pictograms[index].description = payload.newDescription;
            return {
                ...state,
                pictograms: state.pictograms.filter(pictogram => pictogram !== null)
            };
        }
        case FETCH_DELETE_PICTOGRAM_SUCCESS: {
            return {
                ...state,
                loading: false,
                pictograms: state.pictograms.filter(pictogram => pictogram.id !== payload.id)
            }
        }
        case SELECT_PICTOGRAM_TO_PHRASE: {
            return {
                ...state,
                pictogramsSelected: state.pictogramsSelected.concat(payload.pictogram)
            }
        }
        case UNSELECT_PICTOGRAM_TO_PHRASE: {
            
            return {
                ...state,
                pictogramsSelected: state.pictogramsSelected.filter((pictogram, index) => index !== payload.index)
            }
        }
        default:
            return state;
    }
    
}

export default pictogramsReducer;

