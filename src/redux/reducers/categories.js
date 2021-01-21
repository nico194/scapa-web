import { FETCH_CATEGORIES_PENDING,
         FETCH_CATEGORIES_ERROR,
         FETCH_CATEGORIES_SUCCESS,
         FETCH_ADD_CATEGORY_SUCCESS,
         FETCH_UPDATE_CATEGORY_SUCCESS,
         FETCH_DELETE_CATEGORY_SUCCESS,
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
        case FETCH_ADD_CATEGORY_SUCCESS: {
            return {
                ...state,
                loading: false,
                categories: state.categories.concat(payload.category)
            }
        }
        case FETCH_UPDATE_CATEGORY_SUCCESS: {
            const index = state.categories.findIndex(category => category.id === payload.id);
            state.categories[index].description = payload.newDescription;
            return {
                ...state,
                loading: false,
                categories: state.categories.filter(category => category !== null)
            };
        }
        case FETCH_DELETE_CATEGORY_SUCCESS: {
            return {
                ...state,
                loading: false,
                categories: state.categories.filter(category => category.id !== payload.category.id)
            }
        }
        default:
            return state;
    }
}

export default categoriesReducer;

