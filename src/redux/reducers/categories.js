import { 
    FETCH_CATEGORIES_PENDING,
    FETCH_CATEGORIES_ERROR,
    FETCH_CATEGORIES_SUCCESS,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_ERROR,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    
    } from '../constants/categories';

const initialState = {
    loading: false,
    categories: [],
    category: {},
    err: null
}

function categoriesReducer(state = initialState, {type, payload}) {
    switch(type) {
        case FETCH_CATEGORIES_PENDING: 
            return {
                ...state,
                loading: true
            }
        case FETCH_CATEGORIES_ERROR: {
            return {
                ...state,
                loading: false,
                err: payload.err
            }
        }
        case FETCH_CATEGORIES_SUCCESS: 
            return {
                ...state,
                loading: false,
                categories: payload.categories
            }
        case ADD_CATEGORY_SUCCESS: {
            return {
                ...state,
                loading: false,
                categories: state.categories.concat(payload.category)
            } 
        }
        case ADD_CATEGORY_ERROR: {
            return {
                ...state,
                loading: false,
                err: payload.err
            }
        }
        case UPDATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                loading: false,
                categories: state.categories.map( cat => cat.id === payload.category.id ? { ...cat, attributes:  { description : payload.category.attributes.description } } : cat )
            };
        }
        case UPDATE_CATEGORY_ERROR: {
            return {
                ...state,
                loading: false,
                err: payload.err
            }
        }
        case DELETE_CATEGORY_SUCCESS: {
            return {
                ...state,
                loading: false,
                categories: state.categories.filter(category => category.id !== payload.category.id)
            }
        }
        case DELETE_CATEGORY_ERROR: {
            return {
                ...state,
                loading: false,
                err: payload.err
            }
        }
        default:
            return state;
    }
}

export default categoriesReducer;

