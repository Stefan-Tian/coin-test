import { useState, useEffect } from 'react';

const useSortList = <T>(list: T[] | null) => {
  const [originalList, setOriginalList] = useState(list || []);
  const [sortedList, setSortedList] = useState(list || []);
  const [prevSortBy, setPrevSortBy] = useState<string | number | symbol>('');

  useEffect(() => {
    if (list) {
      setOriginalList(list);
      setSortedList(list);
    }
  }, [list]);

  const sortListBy = (sortBy: keyof T) => {
    if (list === null) return;

    if (prevSortBy === sortBy) {
      setSortedList((prevList) => {
        const reversedList = [...prevList].reverse();
        return reversedList;
      });
      return;
    }

    setPrevSortBy(sortBy);
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

  const resetOrder = () => {
    if (list === null) return;
    setSortedList(originalList);
  };

  return { sortedList, sortListBy, resetOrder };
};

export default useSortList;
