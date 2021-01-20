import { FETCH_CATEGORIES_PENDING,
         FETCH_CATEGORIES_ERROR,
         FETCH_CATEGORIES_SUCCESS,
         FETCH_PATIENT_CATEGORIES_SUCCESS,
         FETCH_ADD_CATEGORY_SUCCESS,
         FETCH_ADD_CATEGORIES_TO_FOLDER,
         FETCH_UPDATE_CATEGORY_SUCCESS,
         FETCH_DELETE_CATEGORY_SUCCESS,
         FETCH_DELETE_CATEGORY_TO_FOLDER
       } from '../constants/categories';

const initialState = {
    loading: false,
    categories: [],
    patientCategories: [],
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
        case FETCH_PATIENT_CATEGORIES_SUCCESS: 
            return {
                ...state,
                loading: false,
                patientCategories: payload.categories
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
                categories: state.categories.filter(category => category.id !== payload.id)
            }
        }
        case FETCH_ADD_CATEGORIES_TO_FOLDER : {
            console.log('concat',payload.category)
            return {
                ...state,
                loading: false,
                patientCategories: state.patientCategories.concat(payload.category)
            }
        }
        case FETCH_DELETE_CATEGORY_TO_FOLDER: {
            console.log('delete',state.patientCategories, state.patientCategories.filter(category => category.id !== payload.id))
            return {
                ...state,
                loading: false,
                patientCategories: state.patientCategories.filter(category => category.id !== payload.id)
            }
        }
        default:
            return state;
    }
}

export default categoriesReducer;

