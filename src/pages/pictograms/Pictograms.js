import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPictograms,
  addPictogram,
  updatePictogram,
  clearError,
} from '../../redux/actions/pictograms';
import { PictogramsSearch } from '../../components/templates/pictograms/pictograms-search/PictogramsSearch';
import { PictogramsTable } from '../../components/templates/pictograms/pictograms-table/PictogramsTable';
import { PictogramsPagination } from '../../components/templates/pictograms/pictograms-pagination/PictogramsPagination';
import { PictogramsModal } from '../../components/templates/pictograms/pictograms-modal/PictogramsModal';
import {
  Container,
  Grid,
  IconButton,
  Typography,
  Alert,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Pictograms = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { pictograms, loadingPictograms, totalPage, changed, err } =
    useSelector((state) => state.pictograms);

  const initialStatePictogram = {
    id: -1,
    previewImage: null,
    attributes: {
      description: '',
      image_url: '',
    },
    relationships: {
      classifiable: {
        data: {
          id: 1,
        },
      },
    },
  };

  const [modal, handleModal] = useState(false);
  const [pictogram, setPictogram] = useState(initialStatePictogram);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fistTime, setFirstTime] = useState(true);

  useEffect(() => {
    dispatch(getPictograms(user, 1, 15));
    if (fistTime) {
      dispatch(getPictograms(user));
      setFirstTime(false);
    } else {
      changed && dispatch(getPictograms(user));
    }
  }, [user, dispatch, changed]);

  const openModal = () => {
    setPictogram(initialStatePictogram);
    setIsUpdate(false);
    handleModal(true);
  };

  const createPictogram = () => {
    isUpdate
      ? dispatch(updatePictogram(pictogram, user))
      : dispatch(addPictogram(pictogram, user));
    handleModal(false);
  };

  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' marginBottom={8}>
        Pictogramas
      </Typography>
      {err && (
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
                onClick={() => dispatch(clearError())}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {err}
          </Alert>
        </Grid>
      )}
      <Grid container justifyContent='space-between' marginBottom={6}>
        <Grid item>
          <PictogramsSearch user={user} />
        </Grid>
        <Grid item>
          <Button onClick={openModal} variant='contained'>
            Agregar Pictograma
          </Button>
        </Grid>
      </Grid>
      <Grid container marginBottom={4}>
        <PictogramsTable
          pictograms={pictograms}
          user={user}
          loading={loadingPictograms}
          setPictogram={setPictogram}
          handleModal={handleModal}
          setIsUpdate={setIsUpdate}
        />
      </Grid>
      <Grid container justifyContent='center'>
        <PictogramsPagination
          user={user}
          totalPage={totalPage}
          dispatchFunction={(page) => dispatch(getPictograms(user, page, 10))}
        />
      </Grid>
      <PictogramsModal
        user={user}
        modal={modal}
        handleModal={handleModal}
        pictogram={pictogram}
        isUpdate={isUpdate}
        setPictogram={setPictogram}
        createPictogram={createPictogram}
        loading={loadingPictograms}
      />
    </Container>
  );
};
