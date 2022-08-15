import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../../atoms/spinner/Spinner';
import { Phrase } from '../../../organisms/phrase/Phrase';
import { deleteRoutine } from '../../../../redux/actions/routines';
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const RoutinesList = ({ routines, loading, user }) => {
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const updateRoutine = routineForUpdate => {
		navigate('/routine', {
			state: {
				routineForUpdate
			}
		})
	}

	const deleteRoutineButton = (routine) => {
    if (window.confirm('Desea eliminar esta categoría?')) {
      dispatch(deleteRoutine(routine, user));
    }
  };

	const routinesList = routines.map(routine => {
		return (
			<Grid key={routine.id} item container padding={4} marginBottom={4} border={1} borderColor='Highlight' borderRadius={4}>
				<Grid item xs={11}>
					<Phrase phrase={routine} />
				</Grid>
				<Grid item xs={1} sx={{ textAlign: 'right' }}>
					<IconButton onClick={() => updateRoutine(routine)}>
            <EditIcon />
          </IconButton>
					<IconButton onClick={() => deleteRoutineButton(routine)}>
            <DeleteIcon />
          </IconButton>
				</Grid>
			</Grid>
		);
	})

	if (loading) {
		return <Spinner type='primary'/>
	}

	return (
		<>{routinesList}</>
	)
}
