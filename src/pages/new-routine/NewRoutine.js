import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getCategories } from '../../redux/actions/categories';
import { getPictograms } from '../../redux/actions/pictograms';
import { addRoutine } from '../../redux/actions/routines';
import Input from '../../components/atoms/input/Input'
import Spinner from '../../components/atoms/spinner/Spinner';
import Select from '../../components/atoms/select/Select';
import Pictogram from '../../components/organims/pictogram/Pictogram'
import Header from '../../components/organims/header/Header';

export default function NewRoutine() {

    const [ phrase, setPhrase ] = useState([]);
    const [ description, setDescription ] = useState('');

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const { categories, loadingC } = useSelector(state => state.categories)
    const { pictograms, loadingP } = useSelector(state => state.pictograms)
    const { changed } = useSelector(state => state.routines)

    useEffect(() => {
        dispatch(getCategories(user,1, 999));
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(getPictograms(user));
    }, [dispatch, user]);

    const categoryOptions = categories.map( category => {
        return (
            <option 
                key={ category.id } 
                value={ category.id } 
                >
                {category.attributes.description}
            </option>
        )
    })

    const searchPictogramsFromCategory = idCategory => {
        console.log('id category: ', idCategory);
    }

    const pictogramImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiqiPQ9I_JWbO3G9OlfDjlVdcjbK05VtIMg&usqp=CAU';
    const pictogramsCard = pictograms.map(pictogram => {
        return (
            <Pictogram width='10%' onClick={ () => addPictogramToPhrase(pictogram)} key={pictogram.id} img={pictogramImage} description={ pictogram.attributes.description } />
        )
    })

    const phraseCards = phrase.map( pictogram => {
        return (
            <Pictogram width='10%' onClick={ () => removePictogramToPhrase(pictogram)} key={pictogram.id} img={pictogramImage} description={ pictogram.attributes.description } />
        )
    }) 

    const addPictogramToPhrase = pictogram => {
        setPhrase([ ...phrase, pictogram ])
    }

    const removePictogramToPhrase = pictogramToRemove => {
        setPhrase(phrase.filter( pictogram => pictogram.id !== pictogramToRemove.id))
    }

    const addNewRoutine = () => {
        const routine = {
            description,
            pictograms: phrase
        }
        dispatch(addRoutine(routine));
    }

    return (
        <>
            <Header />
            <div className='container'>
                <h1 className='mb-5'>Armado de Rutinas</h1>
                <Input label='Descripción' type='text' placeholer='Ingrese aqui su descripción...' onChange={ e => setDescription(e.target.value)} />
                <div className="row">
                    <div className="col-12 mb-5">
                        <label className='form-label mb-3'>Rutina: </label>
                        <div className="py-3 d-flex flex-row border border-2 border-info rounded-2">
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
                            loadingC ?
                                <Spinner />
                                :
                                <Select
                                    label='Categorías'
                                    options={categoryOptions}
                                    onChange={ e => searchPictogramsFromCategory(e.target.value)}
                                    />                
                        } 
                    </div>
                    <div className="col-4 text-end">
                        <button onClick={ () => dispatch(getPictograms(user)) } className='btn btn-primary mb-3'>Todos los Pictogramas</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-5">
                        <label className='form-label mb-3'>Pictogramas: </label>
                        <div style={{ height: 300 }} className="py-3 d-flex flex-row overflow-auto border border-3 border-dark rounded-2">
                            {
                                loadingP ?
                                    <Spinner />
                                    :
                                    pictograms.length > 0 ?
                                        <>
                                            { pictogramsCard }
                                        </>
                                        :
                                        <h3>No hay resultados</h3>        
                            } 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between w-100">
                            <Link to='/routines' className='btn btn-danger mb-4'>Cancelar</Link>
                            <button onClick={addNewRoutine} className='btn btn-primary mb-4'>Agregar</button>    
                        </div>
                    </div>
                </div>
                { changed && <Redirect to='/routines' /> }
            </div>
        </>
    )
}
