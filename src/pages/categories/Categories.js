import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  addCategory,
  updateCategory,
  clearError,
} from '../../redux/actions/categories';
import { CategoriesTable } from '../../components/templates/categories/categories-table/CategoriesTable';
import { CategoriesSearch } from '../../components/templates/categories/categories-search/CategoriesSearch';
import { CategoriesModal } from '../../components/templates/categories/categories-modal/CategoriesModal';
import { CategoriesPagination } from '../../components/templates/categories/categories-pagination/CategoriesPagination';
import {
  Container,
  Grid,
  Typography,
  Alert,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Categories = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { categories, loadingCategories, err, changed, totalPage } =
    useSelector((state) => state.categories);

  const initialStateCategory = {
    id: -1,
    previewImage: null,
    attributes: {
      description: '',
      image_url: '',
    },
  };
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState(initialStateCategory);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fistTime, setFirstTime] = useState(true);

  useEffect(() => {
    if (fistTime) {
      dispatch(getCategories(user));
      setFirstTime(false);
    } else {
      changed && dispatch(getCategories(user));
    }
  }, [user, dispatch, changed]);

  const openModal = () => {
    setCategory(initialStateCategory);
    setIsUpdate(false);
    setModal(true);
  };

  const createCategory = () => {
    isUpdate
      ? dispatch(updateCategory(category, user))
      : dispatch(addCategory(category, user));
    setModal(false);
  };

  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' marginBottom={8}>
        Categorias
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
          <CategoriesSearch user={user} />
        </Grid>
        <Grid item>
          <Button onClick={openModal} variant='contained'>
            Agregar Categoria
          </Button>
        </Grid>
      </Grid>
      <Grid container marginBottom={4}>
        <CategoriesTable
          categories={categories}
          user={user}
          loading={loadingCategories}
          setCategory={setCategory}
          setModal={setModal}
          setIsUpdate={setIsUpdate}
        />
      </Grid>
      <Grid container justifyContent='center'>
        <CategoriesPagination user={user} totalPage={totalPage} />
      </Grid>
      <CategoriesModal
        modal={modal}
        handleModal={setModal}
        category={category}
        isUpdate={isUpdate}
        setCategory={setCategory}
        createCategory={createCategory}
        loading={loadingCategories}
      />
    </Container>
  );
};
