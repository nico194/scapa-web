import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../../redux/actions/categories';
import Spinner from '../../../atoms/spinner/Spinner';
import Table from '../../../organisms/table/Table';

export default function CategoriesTable({ categories, user, loading, setCategory, setIsUpdate, setModal }) {
  const categoriesHeadTable = ['id', 'Descriptión', '', ''];

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
      <tr key={categoryItem.id}>
        <th scope='row'>{categoryItem.id}</th>
        <td>{categoryItem.attributes.description}</td>
        <td>
          <i
            onClick={() => updateCategoryButton(categoryItem)}
            className='bi bi-pencil-square'
          ></i>
        </td>
        <td>
          <i
            onClick={() => deleteCategoryButton(categoryItem.id)}
            className='bi bi-trash-fill'
          ></i>
        </td>
      </tr>
    );
  });

  if(loading) {
    return <Spinner />
  }

  return <Table thead={categoriesHeadTable} tbody={categoriesRow} />;
}
