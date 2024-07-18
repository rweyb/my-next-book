import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationComponent({ initialPage, count, onPageChange }) {

  const [page, setPage] = React.useState(initialPage);

  React.useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
