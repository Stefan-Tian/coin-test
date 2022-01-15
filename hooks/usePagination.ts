import { useState, useEffect } from 'react';

const usePagination = <T, P extends { page: number }>(
  list: T[] | null,
  params: P
) => {
  const [fullList, setFullList] = useState<T[]>(list || []);
  const [currParams, setCurrParams] = useState(params);

  useEffect(() => {
    if (list && params.page > currParams.page) {
      setFullList([...fullList, ...list]);
    } else if (list) {
      setFullList(list);
    }

    setCurrParams(params);
  }, [list]);

  return { fullList };
};

export default usePagination;
