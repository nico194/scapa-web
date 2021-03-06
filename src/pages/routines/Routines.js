import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getRoutine, deleteRoutine } from '../../redux/actions/routines';
import Pictogram from '../../components/organims/pictogram/Pictogram';
import Header from '../../components/organims/header/Header';

export default function Routines() {

    const history = useHistory();

    const dispatch = useDispatch();
    const { routines } = useSelector(state => state.routines)

    useEffect(() => {
        dispatch(getRoutine())
    }, [dispatch]);

    const updateRoutine = routine => {
        history.push({
            pathname: '/new-routine',
            state: {
                routine
            }
        })
    }

    const pictogramImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgiqiPQ9I_JWbO3G9OlfDjlVdcjbK05VtIMg&usqp=CAU';
    const routinesList = routines.map( routine => {
        return (
            <div key={routine.id} className='row align-items-center mb-5'>
                <div className='col-10'>
                    <div className='d-flex flex-column'> 
                        <div className="d-flex flex-row align-items-center mb-3 ">   
                            <i className='bi bi-circle-fill' style={{ fontSize: '1.5rem'}}></i>
                            <h3 className='mx-3 mb-0'>{ routine.description }</h3>
                        </div>                   
                        <div className="d-flex flex-row align-items-center ">
                            {
                                routine.phrase.map( pictogram => {
                                    return (
                                        <Pictogram width='15%' key={pictogram.id} img={pictogramImage} description={ pictogram.attributes.description } />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='col-2'>
                    <div className='d-flex flex-row justify-content-around align-items-center'>
                        <i 
                            className='bi bi-pencil-square'
                            style={{ fontSize: '1.5rem'}}
                            onClick={() => updateRoutine(routine)} 
                            >
                        </i>
                        <i 
                            className='bi bi-trash-fill'
                            style={{ fontSize: '1.5rem'}}
                            onClick={() => dispatch(deleteRoutine(routine))} 
                            >
                        </i>
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
