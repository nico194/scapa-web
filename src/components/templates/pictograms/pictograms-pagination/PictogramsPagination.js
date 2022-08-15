import { Pagination } from '@mui/material';

export const PictogramsPagination = ({ user, totalPage, dispatchFunction }) => {
  return (
    <Pagination
      sx={{ margin: 0, paddingBottom: 5 }}
      count={totalPage}
      size='large'
      showFirstButton
      showLastButton
      onChange={(e, page) => dispatchFunction(page)}
    />
  );
};
