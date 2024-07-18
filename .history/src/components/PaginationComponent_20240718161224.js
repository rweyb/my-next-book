import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationComponent({ initialPage, count, onPageChange }) {
// page: 現在のページ番号を管理する状態
  const [page, setPage] = React.useState(initialPage);

  // useEffect: ページ番号が変更されたときに onPageChange 関数を呼び出す
  React.useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  //ページネーションコンポーネントが変更されたときにページ番号を更新する関数
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
