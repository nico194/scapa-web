import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../atoms/spinner/Spinner';
import Phrase from '../../../organisms/phrase/Phrase';
import { deleteRoutine } from '../../../../redux/actions/routines';


export default function RoutinesList({ routines, loading, user }) {

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const updateRoutine = routineForUpdate => {
		navigate('/routine', {
			state: {
				routineForUpdate
			}
		})
	}

	const routinesList = routines.map(routine => {
		return (
			<div key={routine.id} className='row align-items-center mb-5'>
				<div className='col-10'>
					<Phrase phrase={routine} />
				</div>
				<div className='col-2'>
					<div className='d-flex flex-row justify-content-around align-items-center'>
						<i
							className='bi bi-pencil-square'
							style={{ fontSize: '1.5rem' }}
							onClick={() => updateRoutine(routine)}
						>
						</i>
						<i
							className='bi bi-trash-fill'
							style={{ fontSize: '1.5rem' }}
							onClick={() => dispatch(deleteRoutine(routine, user))}
						>
						</i>
					</div>
				</div>
			</div>
		);
	})

	if (loading) {
		return <Spinner />
	}

	return (
		<>{routinesList}</>
	)
}
