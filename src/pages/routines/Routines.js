import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutines } from '../../redux/actions/routines';
import { RoutinesList } from '../../components/templates/routines/routines-list/RoutinesList';
import { Button, Container, Grid, Typography } from '@mui/material';

export const Routines = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.users)
	const { routines, loadingRoutines } = useSelector(state => state.routines)

	useEffect(() => {
		dispatch(getRoutines(user))
	}, []);

	return (
		<Container maxWidth='xl'>
			<Grid container justifyContent='space-between'>
				<Grid item>
      		<Typography variant='h4' marginBottom={8}>Rutinas</Typography>
				</Grid>
				<Grid item>
					<Button variant='contained' href='/routine'>Agregar Rutina</Button>
				</Grid>
			</Grid>
			<Grid container direction='column'>
				<RoutinesList
					routines={routines}
					loading={loadingRoutines}
					user={user}
				/>
			</Grid>
		</Container>
	)
}
