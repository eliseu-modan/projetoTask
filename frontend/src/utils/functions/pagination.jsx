export function configPagination(pagination, onChange) {
  return {
    current: pagination.page,
    pageSize: pagination?.pageSize,
    total: pagination?.resultCount,
    onChange,
  };
}
