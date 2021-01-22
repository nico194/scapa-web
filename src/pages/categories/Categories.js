import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../../redux/actions/categories';
import Input from '../../components/atoms/input/Input';
import Spinner from '../../components/atoms/spinner/Spinner';
import Modal from '../../components/molecules/modal/Modal';
import Header from '../../components/organims/header/Header';
import Table from '../../components/molecules/table/Table'

export default function Categories() {

    const [ modal, setModal ] = useState(false); 
    const [ category, setCategory ] = useState({ description: '' });
    const [ isUpdate, setIsUpdate ] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const { categories, loading } = useSelector(state => state.categories)
    
    useEffect(() => {
        dispatch(getCategories(user));
    }, [dispatch, user]);

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
        setCategory({});
        setIsUpdate(false);
        setModal(true)
    }

    const createCategory = () => {
        isUpdate ? dispatch(updateCategory(category, user)) : dispatch(addCategory(category, user))
        setModal(false);
    }

    const updateCategoryButton = (categoryToUpdate) =>{
        setIsUpdate(true);
        setCategory(categoryToUpdate)
        setModal(true);
    };

    const deleteCategoryButton = (id) => {
        dispatch(deleteCategory(id, user));
    }

    return (
        <div>
            <Header />
            {
                modal && (
                    <Modal>
                        <h3>Ingrese el nombre de la categoria:</h3>
                        <Input 
                            label='Categoria' 
                            type='text' 
                            placeholer='Ingrese aqui su categoria...' 
                            value={category.attributes !== undefined ? category.attributes.description : ''}
                            onChange={ e => setCategory({ ...category, attributes: { description : e.target.value} })} />
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                            <button onClick={ () => setModal(false) } className='btn btn-primary mb-4'>Cancelar</button>
                            <button onClick={createCategory} className='btn btn-primary mb-4'>
                                { 
                                    loading ?
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
                    <button onClick={ () => dispatch(getCategories(user)) } className='btn btn-info mb-4 mx-4 text-white'>Ordernar</button>
                    <button onClick={openModal} className='btn btn-primary mb-4'>Agregar Categoria</button>
                </div>
                {
                    loading ?
                        <div className='d-flex flex-row'>
                            <Spinner />
                            <h3 className='px-3'>Cargando...</h3>
                        </div>
                        :
                        <Table thead={categoriesHeadTable} tbody={categoriesRow} />
                }
                
            </div>
        </div>
    )
}
