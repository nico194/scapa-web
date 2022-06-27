import { useState, useEffect } from 'react';
import axiosConfig from '../configs/axios';

export const useCategories = ({ accessToken, client, uid }) => {
	const [categories, setCategories] = useState([]);
	const [loadingCat, setLoadingCat] = useState(false);

	const getCategories = async () => {
		setLoadingCat(true)
		const headers = {
			headers: {
				'access-token': accessToken,
				client,
				uid
			}
		}
		try {
			const response = await axiosConfig.get('/admin/categories?per_page=999', headers);
			setCategories(response.data.data)
			setLoadingCat(false)
		} catch (err) {
			
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	return {
		categories,
		loadingCat
	}
}