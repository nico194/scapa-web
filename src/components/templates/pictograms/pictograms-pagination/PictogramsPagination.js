import { useDispatch } from 'react-redux';
import { getPictograms } from '../../../../redux/actions/pictograms';
import Pagination from '../../../molecules/pagination/Pagination'
import { PICTOGRAMS_PER_PAGE, SIBLING_TO_PAGINATION } from '../../../../configs/utils'

export default function PictogramsPaginator({ user, currentPage, totalPage }) {
  const dispatch = useDispatch();

  const goToPreviousPage = () => {
    dispatch(getPictograms(user, currentPage - 1, 10));
  };

  const goToSpecificPage = (index) => {
    dispatch(getPictograms(user, index, 10));
  };

  const goToNextPage = () => {
    dispatch(getPictograms(user, currentPage + 1, 10));
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalCount={totalPage}
      onPreviousPage={goToPreviousPage}
      onNextPage={goToNextPage}
      onSpecificPage={goToSpecificPage}
      pageSize={PICTOGRAMS_PER_PAGE}
      siblingCount={SIBLING_TO_PAGINATION}
    />
  );
}
