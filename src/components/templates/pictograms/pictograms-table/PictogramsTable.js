import { useDispatch } from 'react-redux';
import { deletePictogram } from '../../../../redux/actions/pictograms';
import { useCategories } from '../../../../hooks/useCategories';
import { Spinner } from '../../../atoms/spinner/Spinner';
import { Table } from '../../../organisms/table/Table';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const PictogramsTable = ({ pictograms, user, loading, setPictogram, setIsUpdate, handleModal }) => { 
  
  const pictogramHeadTable = ['id', 'Imagen', 'Descriptión', 'Category', 'Editar', 'Eliminar'];
	const dispatch = useDispatch();
  const {categories} = useCategories(user);

  
  const updatePictogramButton = (pictogramToUpdate) => {
    setIsUpdate(true);
    setPictogram(pictogramToUpdate);
    handleModal(true);
  };

  const deletePictogramButton = (id) => {
    if (window.confirm('Desea eliminar esta categoría?')) {
      dispatch(deletePictogram(id, user));
    }
  };

  const pictogtamRows = categories.length > 0 && pictograms.map((pictogramItem) => {
    return (
      <TableRow key={pictogramItem.id}>
        <TableCell component='th' scope='row'>{pictogramItem.id}</TableCell>
        <TableCell>{pictogramItem.attributes.description}</TableCell>
        <TableCell>
          <img
            style={{ width: '70px' }} 
            src={`${process.env.REACT_APP_API_URL}${pictogramItem.attributes.image_url}`}
            alt={pictogramItem.attributes.description}
            loading='lazy' 
            />
        </TableCell>
        <TableCell>
          {categories.find(category => category.id === pictogramItem.relationships.classifiable.data.id).attributes.description}
        </TableCell>
        <TableCell>
          <IconButton onClick={() => updatePictogramButton(pictogramItem)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => deletePictogramButton(pictogramItem.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  if(loading) {
    return <Spinner type='primary'/>
  }

  return <Table thead={pictogramHeadTable} tbody={pictogtamRows} />;
}
