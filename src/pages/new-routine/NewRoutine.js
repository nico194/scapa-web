import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { getCategories } from '../../redux/actions/categories';
import { getPictograms, filterPictogramsByCategory } from '../../redux/actions/pictograms';
import { addRoutine, updateRoutine } from '../../redux/actions/routines';
import Input from '../../components/atoms/input/Input'
import Spinner from '../../components/atoms/spinner/Spinner';
import Select from '../../components/atoms/select/Select';
import Pictogram from '../../components/organims/pictogram/Pictogram'
import Header from '../../components/organims/header/Header';

export default function NewRoutine() {

    const [ idRoutine, setIdRoutine ] = useState(0);
    const [ phrase, setPhrase ] = useState([]);
    const [ description, setDescription ] = useState('');
    const [ categoryId, setCategoryId ] = useState(0);
    const [ isUpdate, setIsUpdate ] = useState(false);

    const location = useLocation()
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const { categories, loadingCategories } = useSelector(state => state.categories)
    const { filteredPictograms, loadingPictograms } = useSelector(state => state.pictograms)
    const { changed, lastId } = useSelector(state => state.routines)

    useEffect(() => {
        dispatch(getCategories(user,1, 999));
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(filterPictogramsByCategory(1, user));
    }, [dispatch, user]);

    useEffect(() => {
        if (location.state !== undefined) {
            setIsUpdate(true);
            setIdRoutine(location.state.routine.id);
            setDescription(location.state.routine.description);
            setPhrase(location.state.routine.phrase);
        } else {
            setIsUpdate(false);
            setIdRoutine(lastId)
            setDescription('');
            setPhrase([]);
        }
    }, [location, lastId]);

    const categoryOptions = categories.map( category => {
        return (
            <option 
                key={ category.id } 
                value={ category.id } 
                selected={ category.id === categoryId }
                >
                {category.attributes.description}
            </option>
        )
    })

    const searchPictogramsFromCategory = idCategory => {
        setCategoryId(idCategory);
        dispatch(filterPictogramsByCategory(idCategory, user));
    }

    const pictogramImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiqiPQ9I_JWbO3G9OlfDjlVdcjbK05VtIMg&usqp=CAU';
    const pictogramsCard = filteredPictograms && filteredPictograms.map(pictogram => {
        return (
            <Pictogram width='200px' onClick={ () => addPictogramToPhrase(pictogram)} key={pictogram.id} img={pictogram.attributes.image_url ? `${process.env.REACT_APP_API_URL}${pictogram.attributes.image_url}` : pictogramImage} description={ pictogram.attributes.description } />
        )
    })

    const phraseCards = phrase.map( pictogram => {
        return (
            <Pictogram width='200px' onClick={ () => removePictogramToPhrase(pictogram)} key={pictogram.id} img={pictogram.attributes.image_url ? `${process.env.REACT_APP_API_URL}${pictogram.attributes.image_url}` : pictogramImage} description={ pictogram.attributes.description } />
        )
    }) 

    const addPictogramToPhrase = pictogram => {
        setPhrase([ ...phrase, pictogram ])
    }

    const removePictogramToPhrase = pictogramToRemove => {
        setPhrase(phrase.filter( pictogram => pictogram.id !== pictogramToRemove.id))
    }

    const addOrEditRoutine = () => {
        const routine = {
            description,
            pictograms: phrase
        }
        isUpdate ? dispatch(updateRoutine(routine)) : dispatch(addRoutine(routine, user));
    }

    return (
        <>
            <Header />
            <div className='container'>
                <h1 className='mb-5'>Armado de Rutinas:</h1>
                <Input 
                    label='Descripción' 
                    type='text' placeholer='Ingrese aqui su descripción...' 
                    value={ description }
                    onChange={ e => setDescription(e.target.value)} 
                    />
                <div className="row">
                    <div className="col-12 mb-5">
                        <label className='form-label mb-3'>Rutina:</label>
                        <div className="py-3 d-flex flex-row flex-wrap border border-2 border-info rounded-2">
                            {
                                phrase.length > 0 ?
                                    <>
                                        { phraseCards }
                                    </>
                                    :
                                    <span className='m-2 text-muted'>Ingrese aqui sus pictogramas...</span>        
                            } 
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-8 mb-4">
                        {
                            loadingCategories ?
                                <div className='d-flex flex-row'>
                                    <Spinner />
                                    <h3 className='px-3'>Cargando...</h3>
                                </div>
                                :
                                <Select
                                    label='Categorías'
                                    options={categoryOptions}
                                    selected={categoryId}
                                    onChange={ e => searchPictogramsFromCategory(e.target.value)}
                                    />                
                        } 
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-5">
                        {
                            loadingPictograms ? 
                                <div className='d-flex flex-row'>
                                    <Spinner />
                                    <h3 className='px-3'>Cargando...</h3>
                                </div>
                                :
                                <>
                                    <label className='form-label mb-3'>Pictogramas: </label>
                                    <div style={{ height: 300 }} className="py-3 d-flex flex-row flex-wrap overflow-auto border border-3 border-dark rounded-2">
                                        {
                                            filteredPictograms.length > 0 ?
                                                <>
                                                    { pictogramsCard }
                                                </>
                                                :
                                                <h3>No hay resultados</h3>        
                                        } 
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between w-100">
                            <Link to='/routines' className='btn btn-danger mb-4'>Cancelar</Link>
                            <button onClick={addOrEditRoutine} className='btn btn-primary mb-4'>
                                { isUpdate ? <span>Actualizar</span> : <span>Agregar</span>  }
                            </button>    
                        </div>
                    </div>
                </div>
                { changed && <Redirect to='/routines' /> }
            </div>
        </>
    )
}
