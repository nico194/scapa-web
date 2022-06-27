import { useDispatch } from 'react-redux';
import { deletePictogram } from '../../../../redux/actions/pictograms';
import { useCategories } from '../../../../hooks/useCategories';
import Spinner from '../../../atoms/spinner/Spinner';
import Pictogram from '../../../organisms/pictogram/Pictogram';
import Table from '../../../organisms/table/Table';

export default function PictogramTable({ pictograms, user, loading, setPictogram, setIsUpdate, setModal }) { 
  
  const pictogramHeadTable = ['id', 'Imagen', 'Descriptión', 'Category', '', ''];
	const dispatch = useDispatch();
  const {categories} = useCategories(user);

  
  const updatePictogramButton = (pictogramToUpdate) => {
    setIsUpdate(true);
    setPictogram(pictogramToUpdate);
    setModal(true);
  };

  const deletePictogramButton = (id) => {
    if (window.confirm('Desea eliminar esta categoría?')) {
      dispatch(deletePictogram(id, user));
    }
  };

  const pictogtamRows = categories.length > 0 && pictograms.map((pictogramItem) => {
    return (
      <tr key={pictogramItem.id}>
        <th scope='row'>{pictogramItem.id}</th>
        <td style={{width: 300, margin: '0 auto'}}>
          <Pictogram
            width={180}
            img={`${process.env.REACT_APP_API_URL}${pictogramItem.attributes.image_url}`}
          />
        </td>
        <td>{pictogramItem.attributes.description}</td>
        <td>{categories.find(category => category.id === pictogramItem.relationships.classifiable.data.id).attributes.description}</td>
        <td>
          <i
            onClick={() => updatePictogramButton(pictogramItem)}
            className='bi bi-pencil-square'
          ></i>
        </td>
        <td>
          <i
            onClick={() => deletePictogramButton(pictogramItem.id)}
            className='bi bi-trash-fill'
          ></i>
        </td>
      </tr>
    );
  });

  if(loading) {
    return <Spinner />
  }

  return <Table thead={pictogramHeadTable} tbody={pictogtamRows} />;
}
