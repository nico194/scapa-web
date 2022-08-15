import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { filterPictogramsByCategory } from '../../redux/actions/pictograms';
import {
  addRoutine,
  updateRoutine,
  clearError,
} from '../../redux/actions/routines';
import { CategoriesSelect } from '../../components/templates/categories/categories-select/CategoriesSelect';
import { PictogramsContainer } from '../../components/templates/pictograms/pictograms-container/PictogramsContainer';
import { Phrase } from '../../components/organisms/phrase/Phrase';
import { Spinner } from '../../components/atoms/spinner/Spinner';
import {
  Alert,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { PictogramsPagination } from '../../components/templates/pictograms/pictograms-pagination/PictogramsPagination';
import CloseIcon from '@mui/icons-material/Close';

export const Routine = () => {
  const initialRoutineState = {
    description: '',
    pictograms: [],
  };

  const [routine, setRoutine] = useState(initialRoutineState);
  const [categoryId, setCategoryId] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { loadingRoutines, changed, err } = useSelector(
    (state) => state.routines
  );
  const { filteredPictograms, loadingPictograms, totalPage } = useSelector(
    (state) => state.pictograms
  );

  let navigate = useNavigate();
  const location = useLocation();
  const routineForUpdate = location.state
	? location.state.routineForUpdate
	: null;
	
  useEffect(() => {
    if (routineForUpdate) {
      setIsUpdate(true);
      setRoutine(routineForUpdate);
    } else {
      setIsUpdate(false);
      setRoutine(initialRoutineState);
    }
  }, [routineForUpdate]);

  useEffect(() => {
    dispatch(filterPictogramsByCategory(categoryId, user, 12));
  }, [dispatch, user]);

  useEffect(() => {
    changed && navigate('/routines');
  }, [changed]);

  const searchPictogramsFromCategory = (idCategory) => {
    setCategoryId(idCategory);
    dispatch(filterPictogramsByCategory(idCategory, user, 12));
  };

  const addPictogramToPhrase = (pictogram) => {
    setRoutine({ ...routine, pictograms: [...routine.pictograms, pictogram] });
  };

  const removePictogramToPhrase = (pictogramToRemove) => {
    setRoutine({
      ...routine,
      pictograms: routine.pictograms.filter(
        (pictogram) => pictogram.id !== pictogramToRemove.id
      ),
    });
  };

  const addOrEditRoutine = () => {
    if (routine.description === '' || routine.pictograms.length === 0) {
      window.scrollTo(0, 0);
      setShowAlert(true);
    } else {
      setShowAlert(false);
      isUpdate
        ? dispatch(updateRoutine(routine, user))
        : dispatch(addRoutine(routine, user));
    }
  };

  return (
    <Container maxWidth='xl'>
      <Grid
        container
        justifyContent='space-between'
        direction='row'
        marginBottom={5}
      >
        <Grid item>
          <Typography variant='h4'>Armado de Rutina</Typography>
        </Grid>
        <Grid item spacing={4}>
          <Button variant='text' onClick={() => navigate('/routines')}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            sx={{ marginLeft: 4 }}
            onClick={addOrEditRoutine}
          >
            { isUpdate ? 'Actualizar ' :  'Agregar '}Rutina
          </Button>
        </Grid>
      </Grid>
      {(err || showAlert) && (
        <Grid container marginBottom={4}>
          <Alert
            severity='error'
            sx={{
              width: '100%',
              borderRadius: 2,
              padding: 1,
              paddingX: 4,
              fontSize: 18,
              alignItems: 'center',
            }}
            action={
              <IconButton
                color='inherit'
                size='large'
                onClick={() => err ? dispatch(clearError()) : setShowAlert(false)}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {err ? err : 'Complete todos los datos del formulario'}
          </Alert>
        </Grid>
      )}
      <Grid container marginBottom={8}>
        <TextField
          label='Ingrese la descripcion de la rutina...'
          fullWidth
          value={routine.description}
          onChange={(e) =>
            setRoutine({ ...routine, description: e.target.value })
          }
        />
      </Grid>
      <Grid container marginBottom={6} spacing={4}>
        <Grid item borderRight={1} borderColor='grey.300' xs={6}>
          <Typography variant='h5' marginBottom={4}>Rutina</Typography>
          <Phrase
            phrase={routine}
            from='routine'
            onPictogramClick={(pictogram) => removePictogramToPhrase(pictogram)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' marginBottom={4}>
            Filtrar por categoria
          </Typography>
          <CategoriesSelect
            user={user}
            categorySelected={categoryId}
            selectCategory={(id) => searchPictogramsFromCategory(id)}
          />
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Typography variant='h6' marginBottom={4}>
                Pictogramas para armar la rutina
              </Typography>
            </Grid>
            <Grid item>
              {filteredPictograms.length > 0 && (
                <PictogramsPagination
                  user={user}
                  totalPage={totalPage}
                  dispatchFunction={(page) =>
                    dispatch(
                      filterPictogramsByCategory(categoryId, user, 12, page)
                    )
                  }
                />
              )}
            </Grid>
          </Grid>
          <PictogramsContainer
            pictograms={filteredPictograms}
            loading={loadingPictograms}
            onPictogramClick={(pictogram) => addPictogramToPhrase(pictogram)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
