import { useState, useEffect } from 'react';

const useSortList = <T>(list: T[] | null) => {
  const [sortedList, setSortedList] = useState(list || []);

  useEffect(() => {
    if (list) {
      setSortedList(list);
    }
  }, [list]);

  const sortListBy = (sortBy: keyof T) => {
    if (list === null) return;

    const listCopy = [...list];
    listCopy.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }

      if (a[sortBy] > b[sortBy]) {
        return 1;
      }

      return 0;
    });

    setSortedList(listCopy);
  };

  return { sortedList, sortListBy };
};

export default useSortList;
