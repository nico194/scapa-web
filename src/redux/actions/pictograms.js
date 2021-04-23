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
    FILTER_PICTOGRAMS_BY_CATEGORY
    } from '../constants/pictograms';
import axiosConfig from '../../configs/axios'

export const getPictograms = ({ accessToken, client, uid }, page = 1) => {
    return dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        axiosConfig.get(`/admin/pictograms?per_page=15&page=${page}`, headers )
            .then( response => 
                dispatch({ 
                    type: FETCH_PICTOGRAMS_SUCCESS, 
                    payload: { 
                        pictograms: response.data.data,
                        previousPage: response.data.meta.prev_page,
                        currentPage: response.data.meta.current_page ,
                        totalPage: response.data.meta.total_pages ,
                        nextPage: response.data.meta.next_page
                    }
                }))
            .catch( err => dispatch({ type: FETCH_PICTOGRAMS_ERROR, payload: {err}}));
    }
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const addPictogram = (pictogramToAdd , { accessToken, client, uid }) => {
    return async dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        const imageInBase64 = await toBase64(pictogramToAdd.image)
        const pictogram = {
            pictogram: {
                description: pictogramToAdd.attributes.description,
                classifiable_id: pictogramToAdd.relationships.classifiable.data.id,
                image: {
                    data: imageInBase64,
                    filename: pictogramToAdd.attributes.description
                }
            }
        }
        try {
            const response = await axiosConfig.post('/admin/pictograms', JSON.stringify(pictogram), headers )
            return dispatch({ type: ADD_PICTOGRAM_SUCCESS, payload: {pictogram: response.data.data}})
        } catch (err) {
            console.log(err)
            return dispatch({ type: ADD_PICTOGRAM_ERROR, payload: {err}});
        }
    }
}

export const deletePictogram = (id, { accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        axiosConfig.delete(`/admin/pictograms/${id}`, headers )
            .then( response => dispatch({ type: DELETE_PICTOGRAM_SUCCESS, payload: {pictogram: response.data.data}}))
            .catch( err => dispatch({ type: DELETE_PICTOGRAM_ERROR, payload: {err}}));
    }
}

export const updatePictogram = (pictogramToUpdate, { accessToken, client, uid }) => {
    return async dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = {
            headers: {
                'access-token': accessToken,
                client,
                uid
            }
        }
        const imageInBase64 = await toBase64(pictogramToUpdate.image)
        const pictogram = {
            pictogram: {
                description: pictogramToUpdate.attributes.description,
                classifiable_id: pictogramToUpdate.relationships.classifiable.data.id,
                image: {
                    data: imageInBase64,
                    filename: pictogramToUpdate.attributes.description
                }
            }
        }
        try {
            const response = await axiosConfig.put(`/admin/pictograms/${pictogramToUpdate.id}`, JSON.stringify(pictogram), headers)

            return dispatch({ type: UPDATE_PICTOGRAM_SUCCESS, payload: {pictogram: response.data.data}})
        } catch (err) {
            console.log(err)
            return dispatch({ type: UPDATE_PICTOGRAM_ERROR, payload: {err}});
        }
    }
}

export const filterPictogramsByCategory = (idCategory, { accessToken, client, uid }) => {
    return dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING });
        const headers = { headers: {
            'access-token': accessToken,
            client,
            uid
        }}
        axiosConfig.get(`/admin/pictograms?category_id=${idCategory}&per_page=100`, headers )
            .then( response =>  {
                
                dispatch({ 
                    type: FILTER_PICTOGRAMS_BY_CATEGORY, 
                    payload: { 
                        pictograms: response.data.data
                    }
                })
            }
            )
            .catch( err => dispatch({ type: FETCH_PICTOGRAMS_ERROR, payload: {err}}));
    }
}

