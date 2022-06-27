import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPictograms,
  addPictogram,
  updatePictogram,
  clearError,
} from '../../redux/actions/pictograms';
import Button from '../../components/atoms/button/Button';
import Alert from '../../components/atoms/alert/Alert';
import Header from '../../components/organisms/header/Header';
import PictogramsSearch from '../../components/templates/pictograms/pictograms-search/PictogramsSearch';
import PictogramsTable from '../../components/templates/pictograms/pictograms-table/PictogramsTable';
import PictogramsPagination from '../../components/templates/pictograms/pictograms-pagination/PictogramsPagination';
import PictogramsModal from '../../components/templates/pictograms/pictograms-modal/PictogramsModal';


export default function Pictograms() {
  
  const dispatch = useDispatch();
	const { user } = useSelector((state) => state.users);
	const {
		pictograms,
		loadingPictograms,
    currentPage, 
    totalPage, 
    err
	} = useSelector((state) => state.pictograms);

  const initialStatePictogram = {
    id: -1,
    image: null,
    attributes: {
      description: '',
      image_url: '',
    },
    relationships: {
      classifiable: {
        data: {
          id: 1,
        },
      },
    },
  };

  const [modal, setModal] = useState(false);
  const [pictogram, setPictogram] = useState(initialStatePictogram);
  const [isUpdate, setIsUpdate] = useState(false);

	useEffect(() => {
		dispatch(getPictograms(user, 1, 10))
    // if(fistTime) {
    //   dispatch(getCategories(user))
    //   setFirstTime(false);
    // } else {
    //   changed &&  dispatch(getPictograms(user))
    // }
  }, [user, dispatch]);

  const openModal = () => {
    setPictogram(initialStatePictogram);
    setIsUpdate(false);
    setModal(true);
  };

  const createPictogram = () => {
    isUpdate
        ? dispatch(updatePictogram(pictogram, user))
        : dispatch(addPictogram(pictogram, user));
      setModal(false);
  };

  return (
    <>
      <Header />
      <div className='container'>
        <h1 className='mb-4'>Pictogramas</h1>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <PictogramsSearch user={user}/>
          </div>
          <div className='col-12 col-md-6'>
            <Button
              text='Agregar Pictograma'
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
				<PictogramsTable 
          pictograms={pictograms} 
          user={user}
          loading={loadingPictograms}
          setPictogram={setPictogram}
          setModal={setModal}
          setIsUpdate={setIsUpdate}
        />
        <PictogramsPagination
          user={user}
          currentPage={currentPage} 
          totalPage={totalPage} 
        />
      </div>
      {
        modal &&
          <PictogramsModal
            user={user}
            pictogram={pictogram}
            isUpdate={isUpdate}
            setPictogram={setPictogram}
            setModal={setModal}
            createPictogram={createPictogram}
            loading={loadingPictograms}
          />
      }
    </>
  );
}
