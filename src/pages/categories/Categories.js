import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../../redux/actions/categories';
import Input from '../../components/atoms/input/Input';
import Spinner from '../../components/atoms/spinner/Spinner';
import Modal from '../../components/molecules/modal/Modal';
import Header from '../../components/organims/header/Header';
import Paginator from '../../components/molecules/paginator/Paginator';
import Table from '../../components/molecules/table/Table';

export default function Categories() {

    const initialStateCategory = {
        id: -1,
        attributes: {
            description: ''
        }
    }

    const [ modal, setModal ] = useState(false); 
    const [ category, setCategory ] = useState(initialStateCategory);
    const [ isUpdate, setIsUpdate ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const { categories,
            changed, 
            previousPage,
            currentPage,
            totalPage,
            nextPage,
            loadingCategories } = useSelector(state => state.categories)
    
    useEffect(() => {
        dispatch(getCategories(user));
    }, [dispatch, user]);

    useEffect(() => {
        changed && dispatch(getCategories(user));
    }, [changed]);

    const categoriesHeadTable = ['id', 'Descriptión', '', '']

    const categoriesRow = categories.map( categoryItem => {
        return (
            <tr key={ categoryItem.id }>
                <th scope='row'>{ categoryItem.id }</th>
                <td>{ categoryItem.attributes.description}</td>
                <td>
                    <i onClick={() => updateCategoryButton(categoryItem)} className='bi bi-pencil-square'></i>
                </td>
                <td>
                    <i onClick={() => deleteCategoryButton(categoryItem.id)} className='bi bi-trash-fill'></i>
                </td>
            </tr>
        )
    });

    const openModal = () => {
        setCategory(initialStateCategory);
        setShowAlert(false);
        setIsUpdate(false);
        setModal(true)
    }

    const createCategory = () => {
        if(category.attributes.description !== '') {
            isUpdate ? dispatch(updateCategory(category, user)) : dispatch(addCategory(category, user))
            setModal(false);
        } else {
            setShowAlert(true);
        }
    }

    const updateCategoryButton = (categoryToUpdate) =>{
        setIsUpdate(true);
        setCategory(categoryToUpdate)
        setModal(true);
    };

    const deleteCategoryButton = (id) => {
        if(window.confirm('Desea eliminar esta categoría?')) {
            dispatch(deleteCategory(id, user));
        }
    }

    const goToPreviousPage = () => {
        dispatch(getCategories(user, currentPage - 1));
    }

    const goToSpecificPage = (index) => {
        dispatch(getCategories(user, index));
    }

    const goToNextPage = () => {
        dispatch(getCategories(user, currentPage + 1));
    }

    return (
        <>
            <Header />
            {
                modal && (
                    <Modal>
                        <h3>Ingrese el nombre de la categoría:</h3>
                        {
                            showAlert &&
                            <div className="alert alert-danger" role="alert">
                                Complete el campos por favor
                            </div>
                        }
                        <Input 
                            label='Categoría' 
                            type='text' 
                            placeholer='Ingrese aqui su categoría...' 
                            value={category.attributes !== undefined ? category.attributes.description : ''}
                            onChange={ e => setCategory({ ...category, attributes: { description : e.target.value} })} />
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                            <button onClick={ () => setModal(false) } className='btn btn-danger'>Cancelar</button>
                            <button onClick={createCategory} className='btn btn-primary'>
                                { 
                                    loadingCategories ?
                                        <Spinner type='light' />
                                        :
                                        <span>{ isUpdate ? 'Actualizar' : 'Agregar'}</span>
                                }
                            </button>
                        </div>
                    </Modal>    
                )
            }                
            <div className='container'>
                <h1 className= 'mb-4'>Categorias</h1>
                <div className='w-100 d-flex flex-row justify-content-end'>
                    <button onClick={openModal} className='btn btn-primary mb-4'>Agregar Categoría</button>
                </div>
                {
                    loadingCategories ?
                        <div className='d-flex flex-row'>
                            <Spinner />
                            <h3 className='px-3'>Cargando...</h3>
                        </div>
                        :
                        categories.length > 0 ?
                            (
                                <>
                                    <Table thead={categoriesHeadTable} tbody={categoriesRow} />
                                    <Paginator 
                                        previousPage={previousPage}
                                        currentPage={currentPage}
                                        totalPage={totalPage}
                                        nextPage={nextPage}
                                        goToPreviousPage={goToPreviousPage}
                                        goToNextPage={goToNextPage}
                                        goToSpecificPage={goToSpecificPage}
                                    />
                                </>
                            )
                            :
                            <h3>No hay categorias registradas</h3>
                }
            </div>
        </>
    )
}
