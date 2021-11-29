import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categories";
import Paginator from "../../molecules/paginator/Paginator";

export default function CategoriesPaginator() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { previousPage, currentPage, totalPage, nextPage } = useSelector(
    (state) => state.categories
  );

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
    <Paginator
      previousPage={previousPage}
      currentPage={currentPage}
      totalPage={totalPage}
      nextPage={nextPage}
      goToPreviousPage={goToPreviousPage}
      goToNextPage={goToNextPage}
      goToSpecificPage={goToSpecificPage}
    />
  );
}
