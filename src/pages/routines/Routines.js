import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoutines } from '../../redux/actions/routines';
import Header from '../../components/organisms/header/Header';
import RoutinesList from '../../components/templates/routines/routines-list/RoutinesList';

export default function Routines() {


	const dispatch = useDispatch();
	const { user } = useSelector(state => state.users)
	const { routines, loadingRoutines } = useSelector(state => state.routines)

	useEffect(() => {
		dispatch(getRoutines(user))
	}, []);

	return (
		<>
			<Header />
			<div className='container'>
				<h1 className='mb-4'>Rutinas</h1>
				<div className='w-100 d-flex flex-row justify-content-end mb-4'>
					<Link to='/routine' className='btn btn-primary'>Agregar Rutina</Link>
				</div>
				<RoutinesList
					routines={routines}
					loading={loadingRoutines}
					user={user}
				/>
			</div>
		</>
	)
}
