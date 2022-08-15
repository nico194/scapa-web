import {
	FETCH_CATEGORIES_PENDING,
	FETCH_CATEGORIES_ERROR,
	FETCH_CATEGORIES_SUCCESS,
	FETCH_ALL_CATEGORIES_SUCCESS,
	ADD_CATEGORY_SUCCESS,
	ADD_CATEGORY_ERROR,
	UPDATE_CATEGORY_SUCCESS,
	UPDATE_CATEGORY_ERROR,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_ERROR,
	CLEAR_ERROR
} from '../constants/categories';
import axiosConfig from '../../configs/axios'

export const getCategories = ({ accessToken, client, uid }, page = 1, perPage = 15, byDescription = '') => {
	return dispatch => {
		dispatch({ type: FETCH_CATEGORIES_PENDING });
		const headers = {
			headers: {
				'access-token': accessToken,
				client,
				uid
			}
		}
		axiosConfig.get(`/admin/categories?per_page=${perPage}&page=${page}&by_description=${byDescription}`, headers)
			.then(response =>
				dispatch({
					type: FETCH_CATEGORIES_SUCCESS,
					payload: {
						categories: response.data.data,
						previousPage: response.data.meta.prev_page,
						currentPage: response.data.meta.current_page,
						totalPage: response.data.meta.total_pages,
						nextPage: response.data.meta.next_page
					}
				})
			)
			.catch(err => {
				dispatch({ type: FETCH_CATEGORIES_ERROR, payload: { err: err.response.data.error } })
			});
	}
}

export const getAllCategories = ({ accessToken, client, uid }) => {
	return dispatch => {
		dispatch({ type: FETCH_CATEGORIES_PENDING });
		const headers = {
			headers: {
				'access-token': accessToken,
				client,
				uid
			}
		}
		axiosConfig.get('/admin/categories?per_page=999', headers)
			.then(response =>
				dispatch({
					type: FETCH_ALL_CATEGORIES_SUCCESS,
					payload: {
						allCategories: response.data.data
					}
				})
			)
			.catch(err => {
				dispatch({ type: FETCH_CATEGORIES_ERROR, payload: { err: err.response.data.error } })
			});
	}
}

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result);
	reader.onerror = error => reject(error);
});

export const addCategory = (categoryToAdd, { accessToken, client, uid }) => {
	return async dispatch => {
		dispatch({ type: FETCH_CATEGORIES_PENDING });
		const headers = {
			headers: {
				'access-token': accessToken,
				client,
				uid
			}
		}
		const imageInBase64 = await toBase64(categoryToAdd.attributes.image_url)
		const category = {
			category: {
				description: categoryToAdd.attributes.description,
				image: {
					filename: `${categoryToAdd.attributes.description}.png`,
					data: imageInBase64
				}
		
			}
		}
		axiosConfig.post('/admin/categories', JSON.stringify(category), headers)
			.then(response => dispatch({ type: ADD_CATEGORY_SUCCESS, payload: { category: response.data.data } }))
			.catch(err => {
				dispatch({ type: FETCH_CATEGORIES_ERROR, payload: { err: err.response.data.error }})
		});
	}
}

export const updateCategory = (categoryToUpdate, { accessToken, client, uid }) => {
	return async dispatch => {
		dispatch({ type: FETCH_CATEGORIES_PENDING });
		const headers = {
			headers: {
				'access-token': accessToken,
				client,
				uid
			}
		}
		const imageInBase64 = await toBase64(categoryToUpdate.attributes.image_url)
		const category = {
			category: {
				description: categoryToUpdate.attributes.description,
				image: {
					filename: `${categoryToUpdate.attributes.description}.png`,
					data: imageInBase64
				}
			}
		}
		axiosConfig.put(`/admin/categories/${categoryToUpdate.id}`, JSON.stringify(category), headers)
			.then(response => dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: { category: response.data.data } }))
			.catch(err => dispatch({ type: UPDATE_CATEGORY_ERROR, payload: { err: err.response.data.error } }));
	}
}

export const deleteCategory = (id, { accessToken, client, uid }) => {
	return dispatch => {
		dispatch({ type: FETCH_CATEGORIES_PENDING });
		const headers = {
			headers: {
				'access-token': accessToken,
				client,
				uid
			}
		}
		axiosConfig.delete(`/admin/categories/${id}`, headers)
			.then(response => dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: { category: response.data.data } }))
			.catch(err => dispatch({ type: DELETE_CATEGORY_ERROR, payload: { err: err.response.data.error } }));
	}
}


export const clearError = () => dispatch => dispatch({ type: CLEAR_ERROR })
