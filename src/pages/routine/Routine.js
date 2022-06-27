import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { filterPictogramsByCategory } from '../../redux/actions/pictograms';
import { addRoutine, updateRoutine } from '../../redux/actions/routines';
import Input from '../../components/atoms/input/Input'
import Button from '../../components/atoms/button/Button'
import Header from '../../components/organisms/header/Header';
import CategoriesSelect from '../../components/templates/categories/categories-select/CategoriesSelect';
import PictogramsContainer from '../../components/templates/pictograms/pictograms-container/PictogramsContainer';
import Phrase from '../../components/organisms/phrase/Phrase';
import Alert from '../../components/atoms/alert/Alert';
import Spinner from '../../components/atoms/spinner/Spinner';

export default function Routine() {
	const initialRoutineState = {
		description: '',
		pictograms: []
	}

	const [routine, setRoutine] = useState(initialRoutineState);
	const [categoryId, setCategoryId] = useState(0);
	const [isUpdate, setIsUpdate] = useState(false);
	const [showAlert, setShowAlert] = useState(false)

	const dispatch = useDispatch();
	const { user } = useSelector(state => state.users);
	const { loadingRoutines, changed } = useSelector(state => state.routines)
	const { filteredPictograms, loadingPictograms } = useSelector(state => state.pictograms);

	let navigate = useNavigate();
	const location = useLocation();
	const routineForUpdate = location.state ? location.state.routineForUpdate : null
	console.log(location)

	useEffect(() => {
		if(routineForUpdate) {
			setIsUpdate(true);
			setRoutine(routineForUpdate);
		} else {
			setIsUpdate(false);
			setRoutine(initialRoutineState);
		}
	} , [routineForUpdate])

	useEffect(() => {
		dispatch(filterPictogramsByCategory(1, user));
	}, [dispatch, user]);

	useEffect(() => {
		changed && navigate('/routines')
	}, [changed])

	const searchPictogramsFromCategory = idCategory => {
		setCategoryId(idCategory);
		dispatch(filterPictogramsByCategory(idCategory, user));
	}

	const addPictogramToPhrase = pictogram => {
		setRoutine({...routine, pictograms: [...routine.pictograms, pictogram]})
	}

	const removePictogramToPhrase = pictogramToRemove => {
		setRoutine({...routine, pictograms: routine.pictograms.filter(pictogram => pictogram.id !== pictogramToRemove.id) })
	}

	const addOrEditRoutine = () => {
		if (routine.description === '' || routine.pictograms.length === 0) {
			window.scrollTo(0, 0)
			setShowAlert(true)
		} else {
			setShowAlert(false)
			isUpdate ? dispatch(updateRoutine(routine, user)) : dispatch(addRoutine(routine, user));
		}
	}

	return (
		<>
			<Header />
			<div className='container'>
				<h1 className='mb-5'>Armado de Rutinas:</h1>
				{
					showAlert &&
					<Alert message='Complete el campos por favor' onClick={() => setShowAlert(false)} />
      	}
				<div className='row'>
					<div className='col-12 col-md-7 flex-wrap pl-3'>
						<div className='row'>
							<div className='col-6'>
								<h3 className='mb-4'>Rutina</h3>
							</div>
							<div className='col-6 d-flex flex-row justify-content-end'>
								<Button
									text='Volver'
									type='danger'
									position='center'
									onClick={() => navigate('/routines')}
								/>
								<Button
									text={
										loadingRoutines ? (
											<Spinner type='light' />
										) : (
											<span>{isUpdate ? 'Actualizar' : 'Agregar'} Rutina</span>
										)
									}
									type='primary'
									position='center'
									extraClassName='ms-2'
									onClick={addOrEditRoutine}
								/>
							</div>
						</div>
						<Input 
							label='Descripción' 
							type='text' placeholer='Ingrese aqui su descripción...' 
							value={ routine.description }
							onChange={ e => setRoutine({ ...routine, description: e.target.value})} 
							/>
						<p className='mb-4'>Pictogramas seleccionados</p>
						<Phrase
							phrase={routine}
							from='routine'
							onPictogramClick={pictogram => removePictogramToPhrase(pictogram)}
						/>
					</div>
					<div className='col-12 col-md-5 border-start'>
						<h3 className='mb-4'>Filtrar pictogramas por categoría</h3>
						<CategoriesSelect
							user={user}
							categorySelected={categoryId}
							selectCategory={id => searchPictogramsFromCategory(id)}
						/>
						<h3 className='mb-4'>Pictogramas para armar la rutina</h3>
						<PictogramsContainer
							pictograms={filteredPictograms}
							loading={loadingPictograms}
							onPictogramClick={pictogram => addPictogramToPhrase(pictogram)}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
