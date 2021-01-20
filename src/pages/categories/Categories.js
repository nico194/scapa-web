import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categories'
import Modal from '../../components/molecules/modal/Modal';
import Header from '../../components/organims/header/Header';

export default function Categories() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const { categories } = useSelector(state => state.categories)
    
    useEffect(() => {
        dispatch(getCategories(user))
    }, [])    

    const [modal, setModal] = useState(false)   

    const categoriesRow = categories.map( category => {
        return (
            <tr key={ category.id }>
                <th scope='row'>{ category.id }</th>
                <td>{ category.attributes.description}</td>
                <td style={{display:'flex', justifyContent:'space-around'}}>
                    <i className='bi bi-pencil-square'></i>
                    <i className='bi bi-trash-fill ml-2'></i>
                </td>
            </tr>
        )
    });

    return (
        <div>
            <Header />
            {
                modal && (
                    <Modal>
                        <h3>This is a Modal</h3>
                        <button onClick={ () => setModal(false) } className='btn btn-primary mb-4'>close modal</button>
                    </Modal>    
                )
            }                
            <div className='container'>
                <h1 className= 'mb-4'>Categorias</h1>
                <div className='w-100 d-flex justify-content-end'>
                    <button onClick={ () => setModal(true) } className='btn btn-primary mb-4'>Agregar Categoria</button>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>id</th>
                            <th scope='col'>Descripción</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        { categoriesRow }
                    </tbody>
                </table> 
            </div>
        </div>
    )
}
