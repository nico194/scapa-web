import { Pagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categories';

export const CategoriesPagination = ({ user, totalPage }) => {
  const dispatch = useDispatch();

  return (
    <Pagination
      sx={{ margin: 0, paddingBottom: 5 }}
      count={totalPage}
      size='large'
      showFirstButton 
      showLastButton
      onChange={(e, page) => dispatch(getCategories(user, page))}   
    />
  );
}
