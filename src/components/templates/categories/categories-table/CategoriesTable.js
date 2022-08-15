import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../../redux/actions/categories';
import { Spinner } from '../../../atoms/spinner/Spinner';
import { Table } from '../../../organisms/table/Table';

export const CategoriesTable = ({ categories, user, loading, setCategory, setIsUpdate, setModal }) => {
  const categoriesHeadTable = ['Id', 'Descriptión', 'Imagen', 'Editar', 'Eliminar'];

  const dispatch = useDispatch();

  const updateCategoryButton = (categoryToUpdate) => {
    setIsUpdate(true);
    setCategory(categoryToUpdate);
    setModal(true);
  };

  const deleteCategoryButton = (id) => {
    if (window.confirm('Desea eliminar esta categoría?')) {
      dispatch(deleteCategory(id, user));
    }
  };

  const categoriesRow = categories.map((categoryItem) => {
    return (
      <TableRow key={categoryItem.id}>
        <TableCell component='th' scope='row'>{categoryItem.id}</TableCell>
        <TableCell>{categoryItem.attributes.description}</TableCell>
        <TableCell>
          <img
            style={{ width: '70px' }} 
            src={`${process.env.REACT_APP_API_URL}${categoryItem.attributes.image_url}`}
            alt={categoryItem.attributes.description}
            loading='lazy' 
            />
          </TableCell>
        <TableCell>
          <IconButton onClick={() => updateCategoryButton(categoryItem)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => deleteCategoryButton(categoryItem.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  if(loading) {
    return <Spinner type='primary'/>
  }

  return <Table thead={categoriesHeadTable} tbody={categoriesRow} />;
}
