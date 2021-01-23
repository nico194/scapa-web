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

const initialState = {
    loading: false,
    pictograms: [],
    changed: false,
    previousPage: 0, 
    currentPage: 0, 
    totalPage: 0, 
    nextPage: 0,
    err: null
}

function pictogramsReducer(state = initialState, {type, payload}) {
    switch(type) {
        case FETCH_PICTOGRAMS_PENDING: 
            return {
                ...state,
                loading: true
            }
        case FETCH_PICTOGRAMS_ERROR:
        case ADD_PICTOGRAM_ERROR:
        case UPDATE_PICTOGRAM_ERROR:
        case DELETE_PICTOGRAM_ERROR:
        {    
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
                pictograms: payload.pictograms,
                changed: false,
                previousPage: payload.previousPage, 
                currentPage: payload.currentPage, 
                totalPage: payload.totalPage, 
                nextPage: payload.nextPage,
            }
        }
        case ADD_PICTOGRAM_SUCCESS: {
            return {
                ...state,
                pictograms: state.pictograms.concat(payload.pictogram),
                changed: true
            }
        }
        case UPDATE_PICTOGRAM_SUCCESS: {
            return {
                ...state,
                pictograms: state.pictograms.map( 
                    pic => pic.id === payload.pictogram.id ? 
                        { 
                            ...pic, 
                            attributes:  { description : payload.pictogram.attributes.description },
                            relationships: { category: { data: { id: payload.pictogram.relationships.category.data.id } }}  
                        } 
                        : 
                        pic 
                ),
                changed: true
            };
        }
        case DELETE_PICTOGRAM_SUCCESS: {
            return {
                ...state,
                loading: false,
                pictograms: state.pictograms.filter(pictogram => pictogram.id !== payload.pictogram.id)
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

