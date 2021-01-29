import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoutine } from '../../redux/actions/routines';
import Pictogram from '../../components/organims/pictogram/Pictogram';
import Header from '../../components/organims/header/Header';

export default function Routines() {

    const dispatch = useDispatch();
    const { routines } = useSelector(state => state.routines)

    useEffect(() => {
        dispatch(getRoutine())
    }, [dispatch]);

    const pictogramImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiqiPQ9I_JWbO3G9OlfDjlVdcjbK05VtIMg&usqp=CAU';
    const routinesList = routines.map( routine => {
        return (
            <div className='row align-items-center mb-5'>
                <div className='col-10'>
                    <div className="d-flex flex-row align-items-center">
                        <i className="bi bi-circle-fill"></i>
                        {
                            routine.pictograms.map( pictogram => {
                                return (
                                    <Pictogram width='15%' key={pictogram.id} img={pictogramImage} description={ pictogram.attributes.description } />
                                );
                            })
                        }
                    </div>
                </div>
                <div className='col-2'>
                    <div className='d-flex flex-row justify-content-around align-items-center'>
                        <i onClick={() => {}} className='bi bi-pencil-square'></i>
                        <i onClick={() => {}} className='bi bi-trash-fill'></i>
                    </div>
                </div>
            </div> 
        );
    })

    return (
        <>
            <Header />
            <div className='container'>
                <h1 className= 'mb-4'>Rutinas</h1>
                <div className='w-100 d-flex flex-row justify-content-end mb-4'>
                    <Link to='/new-routine' className='btn btn-primary'>Agregar Rutina</Link>
                </div>
                { 
                    routines.length > 0 ?
                        routinesList
                        :
                        <h3>No hay rutinas cargadas</h3>
                }              
            </div>
        </>
    )
}
