import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categories';
import { getPictograms, addPictogram, deletePictogram, updatePictogram } from '../../redux/actions/pictograms';
import Input from '../../components/atoms/input/Input';
import Spinner from '../../components/atoms/spinner/Spinner';
import Select from '../../components/atoms/select/Select';
import Modal from '../../components/molecules/modal/Modal';
import Header from '../../components/organims/header/Header';
import Paginator from '../../components/molecules/paginator/Paginator';
import Table from '../../components/molecules/table/Table'

export default function Pictograms() {

    const [ modal, setModal ] = useState(false); 
    const [ pictogram, setPictogram ] = useState({});
    const [ isUpdate, setIsUpdate ] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const { categories } = useSelector(state => state.categories)
    const { pictograms,
        changed, 
        previousPage,
        currentPage,
        totalPage,
        nextPage,
        loading } = useSelector(state => state.pictograms)

    useEffect(() => {
        dispatch(getCategories(user,1, 999));
    }, [dispatch, user]);
        
    
    useEffect(() => {
        dispatch(getPictograms(user));
    }, [dispatch, user]);

    useEffect(() => {
        changed && dispatch(getPictograms(user));
    }, [changed]);
    
    const pictogramsHeadTable = ['id', 'Imagen', 'Descriptión', 'Categoría' ,'', '']
    const pictogramImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiqiPQ9I_JWbO3G9OlfDjlVdcjbK05VtIMg&usqp=CAU';
    const pictogramsRow = pictograms.map( pictogramItem => {
        const category = categories.filter( category => category.id === pictogramItem.relationships.category.data.id);
        return (
            <tr key={ pictogramItem.id }>
                <th scope='row' style={{ verticalAlign: 'middle' }}>{ pictogramItem.id }</th>
                <td style={{ width: 150, height: 150, textAlign: 'center', verticalAlign: 'middle' }}>
                    <img alt='image' src={pictogramImage}  style={{ maxHeight: '100%', maxWidth: '100%', padding: 5}}/>
                </td>
                <td style={{ verticalAlign: 'middle' }}>{ pictogramItem.attributes.description }</td>
                <td style={{ verticalAlign: 'middle' }}>{ category[0].attributes.description }</td>
                <td style={{ verticalAlign: 'middle' }}>
                    <i onClick={() => updatePictogramButton(pictogramItem)} className='bi bi-pencil-square'></i>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                    <i onClick={() => deletePictogramButton(pictogramItem.id)} className='bi bi-trash-fill'></i>
                </td>
            </tr>
        )
    });

    const categoryOptions = categories.map( category => {
        return (
            <option 
                key={ category.id } 
                value={ category.id } 
                selected={ pictogram.relationships !== undefined && category.id === pictogram.relationships.category.data.id }
                >
                {category.attributes.description}
            </option>
        )
    })

    const selectCategory = category => {
        setPictogram({ ...pictogram, relationships: { category: { data: { id : category } } } })
    }

    const openModal = () => {
        setPictogram({});
        setIsUpdate(false);
        setModal(true)
    }

    const createpictogram = () => {
        isUpdate ? dispatch(updatePictogram(pictogram, user)) : dispatch(addPictogram(pictogram, user))
        setModal(false);
    }

    const updatePictogramButton = (pictogramToUpdate) =>{
        setIsUpdate(true);
        setPictogram(pictogramToUpdate)
        setModal(true);
    };

    const deletePictogramButton = (id) => {
        dispatch(deletePictogram(id, user));
    }

    const goToPreviousPage = () => {
        dispatch(getPictograms(user, currentPage - 1));
    }

    const goToSpecificPage = (index) => {
        dispatch(getPictograms(user, index));
    }

    const goToNextPage = () => {
        dispatch(getPictograms(user, currentPage + 1));
    }

    return (
        <div>
            <Header />
            {
                modal && (
                    <Modal>
                        <h3>Ingrese un pictograma:</h3>
                        <Input 
                            label='Descripción' 
                            type='text' 
                            placeholer='Ingrese aqui su categoria...' 
                            value={pictogram.attributes !== undefined ? pictogram.attributes.description : ''}
                            onChange={ e => setPictogram({ ...pictogram, attributes: { description : e.target.value} })} />
                        <Select
                            label='Categoría'
                            options={categoryOptions}
                            selected={pictogram.relationships !== undefined ? pictogram.relationships.category.data.id : 0}
                            onChange={ e => selectCategory(e.target.value)}
                            />
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                            <button onClick={ () => setModal(false) } className='btn btn-danger mb-4'>Cancelar</button>
                            <button onClick={createpictogram} className='btn btn-primary mb-4'>
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
                <h1 className= 'mb-4'>Pictogramas</h1>
                <div className='w-100 d-flex flex-row justify-content-end'>
                    <button onClick={openModal} className='btn btn-primary mb-4'>Agregar Pictograma</button>
                </div>
                {
                    loading ?
                        <div className='d-flex flex-row'>
                            <Spinner />
                            <h3 className='px-3'>Cargando...</h3>
                        </div>
                        :
                        <Table thead={pictogramsHeadTable} tbody={pictogramsRow} />
                }
                <Paginator 
                    previousPage={previousPage}
                    currentPage={currentPage}
                    totalPage={totalPage}
                    nextPage={nextPage}
                    goToPreviousPage={goToPreviousPage}
                    goToNextPage={goToNextPage}
                    goToSpecificPage={goToSpecificPage}
                />
            </div>
        </div>
    )
}