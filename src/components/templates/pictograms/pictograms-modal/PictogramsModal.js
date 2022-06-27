import React, { useState } from 'react';
import { useCategories } from '../../../../hooks/useCategories';
import Alert from '../../../atoms/alert/Alert';
import Button from '../../../atoms/button/Button';
import Input from '../../../atoms/input/Input';
import Select from '../../../atoms/select/Select';
import Spinner from '../../../atoms/spinner/Spinner'
import UploadImage from '../../../atoms/upload-image/UploadImage';
import Modal from '../../../molecules/modal/Modal';
import CategoriesSelect from '../../../templates/categories/categories-select/CategoriesSelect';

export default function PictogramsModal({ user, pictogram, isUpdate, loading, setPictogram, setModal, createPictogram }) {

	const [charged, setCharged] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	console.log('bbbb', pictogram, pictogram.relationships.classifiable.data.id)

	const setDescription = (e) => {
		setPictogram({
			...pictogram,
			attributes: { ...pictogram.attributes, description: e.target.value },
		});
	};

	const selectCategory = (category) => {
		setPictogram({
			...pictogram,
			relationships: { classifiable: { data: { id: category } } },
		});
	};

	const uploadImagen = (e) => {
		setCharged(true);
		setPictogram({
			...pictogram,
			image: e.target.files[0],
			attributes: {
				...pictogram.attributes,
				image_url: URL.createObjectURL(e.target.files[0]),
			},
		});
	};

	const isNotValidForm = () => {
		let isNotValid = false;
		Object.keys(pictogram).forEach((key) => {
			if (key === 'image') {
				if (pictogram[key] === null) return (isNotValid = true);
			} else {
				if (key === 'attributes') {
					if (pictogram[key].description === '') return (isNotValid = true);
				}
			}
		});
		return isNotValid;
	};

	const validForm = () => {
		setShowAlert(false);
		if (isNotValidForm()) {
			setShowAlert(true);
		} else {
			createPictogram()
		}
	}


	return (
		<Modal>
			<h3>Ingrese el nombre de la categoría:</h3>
			{
				showAlert &&
					<Alert message='Complete el campos por favor' onClick={() => setShowAlert(false)} />
      }
			<Input
				label='Descripción'
				type='text'
				placeholer='Ingrese aqui su categoría...'
				value={pictogram.attributes.description}
				onChange={e => setDescription(e)}
			/>
			<UploadImage
				label='Imagen'
				type='file'
				placeholer='Suba una imagen aquí...'
				src={`${!charged ? process.env.REACT_APP_API_URL : ''}${pictogram.attributes.image_url}`}
				alt={pictogram.image ? pictogram.attributes.description : ''}
				onChange={e => uploadImagen(e)}
			/>
			<CategoriesSelect
					user={user}
					categorySelected={pictogram.relationships.classifiable.data.id}
					selectCategory={id => selectCategory(id)}
				/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}
			>
				<Button text='Cancelar' type='danger' onClick={() => setModal(false)} />
				<Button
					text={
						loading ? (
							<Spinner type='light' />
						) : (
							<span>{isUpdate ? 'Actualizar' : 'Agregar'}</span>
						)
					}
					type='primary'
					onClick={validForm}
				/>
			</div>
		</Modal>
	);
}
