import { useDispatch } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categories';
import Pagination from '../../../molecules/pagination/Pagination';
import { CATEGORIES_PER_PAGE, SIBLING_TO_PAGINATION } from '../../../../configs/utils'

export default function CategoriesPagination({ user, currentPage, totalPage }) {
  const dispatch = useDispatch();

  const goToPreviousPage = () => {
    dispatch(getCategories(user, currentPage - 1));
  };

  const goToSpecificPage = (index) => {
    dispatch(getCategories(user, index));
  };

  const goToNextPage = () => {
    dispatch(getCategories(user, currentPage + 1));
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalCount={totalPage}
      onPreviousPage={goToPreviousPage}
      onNextPage={goToNextPage}
      onSpecificPage={goToSpecificPage}
      pageSize={CATEGORIES_PER_PAGE}
      siblingCount={SIBLING_TO_PAGINATION}
    />
  );
}
