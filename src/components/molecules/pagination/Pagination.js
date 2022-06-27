import { usePagination, DOTS } from "../../../hooks/usePagination";
const Pagination = ({
  currentPage,
  totalCount,
  onPreviousPage,
  onNextPage,
  onSpecificPage,
  siblingCount = 1,
  pageSize,
}) => {
  const paginationRange = usePagination(
    currentPage,
    totalCount,
    pageSize,
    siblingCount
  );

  if (
    currentPage === 0 ||
    (paginationRange !== undefined && paginationRange.length < 2)
  ) {
    return null;
  }

  let lastPage =
    paginationRange !== undefined &&
    paginationRange[paginationRange.length - 1];

  const onPrevious = () => currentPage !== 1 && onPreviousPage();

  const onNext = () => currentPage !== lastPage && onNextPage();

  return (
    <nav aria-label="paginator">
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={onPrevious}
        >
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">Anterior</span>
          </a>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&#8230;</span>
                </a>
              </li>
            );
          }

          return (
            <li
              key={index}
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
              onClick={() => onSpecificPage(pageNumber)}
            >
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">{pageNumber}</span>
              </a>
            </li>
          );
        })}
        <li
          className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}
          onClick={onNext}
          disabled
        >
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">Siguiente</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
