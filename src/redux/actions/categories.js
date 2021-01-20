import { FETCH_CATEGORIES_PENDING,
         FETCH_CATEGORIES_ERROR,
         FETCH_CATEGORIES_SUCCESS, 
         FETCH_PATIENT_CATEGORIES_SUCCESS,
         FETCH_ADD_CATEGORY_SUCCESS,
         FETCH_UPDATE_CATEGORY_SUCCESS,
         FETCH_DELETE_CATEGORY_SUCCESS,
         FETCH_ADD_CATEGORIES_TO_FOLDER,
         FETCH_DELETE_CATEGORY_TO_FOLDER
       } from '../constants/categories';
import config from '../../config';
import axios from 'axios'

export const getCategories = ({ accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_CATEGORIES_PENDING });
        console.log(accessToken, client, uid);
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        axios.get(`${process.env.REACT_APP_API_URL}/admin/categories`, headers )
            .then( response => dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: { categories: response.data.data }}))
            .catch( error => console.log(error))
        // fetch(`${config.server}/categories`)
        // .then(res => res.json())
        // .then(categories => {
        //     return dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: {categories}})
        // })
        // .catch( err => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: {err}}))
    }
}

// export const getCategoriesByPatient = id => {
//     return dispatch => {
//         dispatch({ type: FETCH_CATEGORIES_PENDING});
//         fetch(`${config.server}/categories/folder/${id}`)
//         .then(res => res.json())
//         .then(categories => {
//             return dispatch({ type: FETCH_PATIENT_CATEGORIES_SUCCESS, payload: {categories}})
//         })
//         .catch( err => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: {err}}))
//     }
// }

// export const addCategory = (description) => {
//     return dispatch => {
//         fetch(`${config.server}/categories`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({description})
//         })
//         .then(res => res.json())
//         .then(data => data.insert === 'success' ? dispatch({ type: FETCH_ADD_CATEGORY_SUCCESS, payload: { category: { id: data.response.id, description: description }}}) : 'error')
//         .catch(err => dispatch({type: FETCH_CATEGORIES_ERROR, payload: {err}}));
//     }
// }

// export const deleteCategory = (id) => {
//     return dispatch => {
//         fetch(`${config.server}/categories/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//         .then(res => res.json())
//         .then(data => data.delete === 'success' ? dispatch({ type: FETCH_DELETE_CATEGORY_SUCCESS, payload: {id}}) : 'error')
//         .catch(err => dispatch({type: FETCH_CATEGORIES_ERROR, payload: {err}}));
//     }
// }

// export const updateCategory = (id, newDescription) => {
//     return dispatch => {
//         fetch(`${config.server}/categories/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({description: newDescription})
//         })
//         .then(res => res.json())
//         .then(data => data.update === 'success' ? dispatch({ type: FETCH_UPDATE_CATEGORY_SUCCESS, payload: { id, newDescription }}) : 'error')
//         .catch(err => dispatch({type: FETCH_CATEGORIES_ERROR, payload: {err}}));
//     }
// }

// export const addCategoriesToFolder = (id, categories) => {
//     return dispatch => {
//         dispatch({type: FETCH_CATEGORIES_PENDING });
//         fetch(`${config.server}/categories-folder/${id}`,{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({categories})
//         })
//         .then( res => res.json())
//         .then( data => {
//             data && 
//             data.categories.forEach( category => {
//                 console.log('category', category)
//                 dispatch({ type: FETCH_ADD_CATEGORIES_TO_FOLDER, payload: {category}})
//             })
//         })
//         .catch(err => dispatch({type: FETCH_CATEGORIES_ERROR, payload: {err}}));
//     }
// }

// export const unlinkCategory = (idPatient, idCategory) =>{
//     return dispatch => {
//         dispatch({type: FETCH_CATEGORIES_PENDING });
//         fetch(`${config.server}/categories-folder/${idPatient}/${idCategory}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then( res => res.json())
//         .then( data => data && dispatch({ type: FETCH_DELETE_CATEGORY_TO_FOLDER, payload: {id: idCategory}}))
//         .catch(err => dispatch({type: FETCH_CATEGORIES_ERROR, payload: {err}}));
//     }
// }
