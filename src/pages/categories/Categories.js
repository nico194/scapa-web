import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  addCategory,
  updateCategory,
  clearError
} from '../../redux/actions/categories';
import Header from '../../components/organisms/header/Header';
import CategoriesTable from '../../components/templates/categories/categories-table/CategoriesTable';
import CategoriesSearch from '../../components/templates/categories/categories-search/CategoriesSearch';
import Button from '../../components/atoms/button/Button';
import CategoriesModal from '../../components/templates/categories/categories-modal/CategoriesModal';
import Alert from '../../components/atoms/alert/Alert';
import CategoriesPagination from '../../components/templates/categories/categories-pagination/CategoriesPagination';

export default function Categories() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { 
    categories,
    loadingCategories,
    err,
    changed,
    previousPage,
    currentPage,
    totalPage,
    nextPage 
  } = useSelector((state) => state.categories);

  const initialStateCategory = {
    id: -1,
    attributes: {
      description: '',
    },
  };
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState(initialStateCategory);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fistTime, setFirstTime] = useState(true);

  useEffect(() => {
    if(fistTime) {
      dispatch(getCategories(user))
      setFirstTime(false);
    } else {
      changed &&  dispatch(getCategories(user))
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
    <>
      <Header />
      <div className='container'>
        <h1 className='mb-4'>Categorias</h1>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <CategoriesSearch user={user} />
          </div>
          <div className='col-12 col-md-6'>
            <Button
              text='Agregar Categoria'
              type='primary'
              position='center'
              extraClassName='justify-content-md-end'
              onClick={openModal}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            { err && <Alert message={err} onClick={() => dispatch(clearError())} /> }
          </div>
        </div>
        <CategoriesTable 
          categories={categories} 
          user={user}
          loading={loadingCategories}
          setCategory={setCategory}
          setModal={setModal}
          setIsUpdate={setIsUpdate}
        />
        <CategoriesPagination
          user={user}
          currentPage={currentPage}
          totalPage={totalPage}
        />
        {
          modal &&
          <CategoriesModal 
            category={category}
            isUpdate={isUpdate}
            setCategory={setCategory}
            setModal={setModal}
            createCategory={createCategory}
            loading={loadingCategories}
          />
        }
      </div>
    </>
  );
}
