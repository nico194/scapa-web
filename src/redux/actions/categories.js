import { FETCH_CATEGORIES_PENDING,
         FETCH_CATEGORIES_ERROR,
         FETCH_CATEGORIES_SUCCESS,
         FETCH_ADD_CATEGORY_SUCCESS,
         FETCH_UPDATE_CATEGORY_SUCCESS,
         FETCH_DELETE_CATEGORY_SUCCESS,
       } from '../constants/categories';
import axiosConfig from '../../configs/axios'

export const getCategories = ({ accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_CATEGORIES_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        axiosConfig.get('/admin/categories?per_page=100', headers )
            .then( response => dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: { categories: response.data.data }}))
            .catch( err => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: {err}}));
    }
}

export const addCategory = (categoryDescription, { accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_CATEGORIES_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        const category = {
            category: {
                description: categoryDescription.attributes.description
            }
        }
        axiosConfig.post('/admin/categories', JSON.stringify(category), headers )
            .then( response => dispatch({ type: FETCH_ADD_CATEGORY_SUCCESS, payload: {category: response.data.data}}))
            .catch( err => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: {err}}));
    }
}

export const deleteCategory = (id, { accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_CATEGORIES_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        axiosConfig.delete(`/admin/categories/${id}`, headers )
            .then( response => dispatch({ type: FETCH_DELETE_CATEGORY_SUCCESS, payload: {category: response.data.data}}))
            .catch( err => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: {err}}));
    }
}

export const updateCategory = (categoryToUpdate, { accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_CATEGORIES_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        const category = {
            category: {
                description: categoryToUpdate.attributes.description
            }
        }
        axiosConfig.put(`/admin/categories/${categoryToUpdate.id}`, JSON.stringify(category), headers)
            .then( response => dispatch({ type: FETCH_UPDATE_CATEGORY_SUCCESS, payload: {category: response.data.data}}))
            .catch( err => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: {err}}));
    }
}
