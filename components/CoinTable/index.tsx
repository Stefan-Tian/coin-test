import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRef, useState } from 'react';
import services from '../../services';
import useApiRequest from '../../hooks/useApiRequest';
import usePagination from '../../hooks/usePagination';
import CoinRow from '../CoinRow';
import { CoinMarketData, MarketsParams, OrderType } from '../../services/types';
import CoinTableHead, {
  CoinTableHeadProps,
  SortDirection,
  SortField,
} from '../CoinTableHead';

const DEFAULT_ORDER_TYPE = 'gecko';
const DEFAULT_ORDER_DIRECTION = 'desc';

const defaultMarketParams: MarketsParams = {
  vsCurrency: 'usd',
  page: 1,
  perPage: 25,
  order: `${DEFAULT_ORDER_TYPE}_${DEFAULT_ORDER_DIRECTION}`,
};

const CoinTable = () => {
  const { data, error, params, loading, setParams } = useApiRequest(
    services.getMarket,
    defaultMarketParams
  );

  const listRef = useRef<FlatList<CoinMarketData>>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    DEFAULT_ORDER_DIRECTION
  );
  const [prevSortField, setPrevSortField] =
    useState<SortField>(DEFAULT_ORDER_TYPE);

  const { fullList } = usePagination(data, params);

  const sortListBy = (sortField: SortField) => {
    if (!listRef.current) return;

    let newDirection: SortDirection = 'desc';
    if (sortField === prevSortField && sortDirection === 'desc') {
      newDirection = 'asc';
    }

    const order: OrderType = `${sortField}_${newDirection}`;
    listRef.current.scrollToOffset({ offset: 0 });
    setParams((oldParams) => ({
      ...oldParams,
      order,
      page: 1,
    }));

    setSortDirection(newDirection);
    setPrevSortField(sortField);
  };

  const resetOrder = () => {
    if (!listRef.current) return;
    listRef.current.scrollToOffset({ offset: 0 });
    setParams((oldParams) => ({
      ...oldParams,
      order: defaultMarketParams.order,
      page: 1,
    }));
    setSortDirection(DEFAULT_ORDER_DIRECTION);
    setPrevSortField(DEFAULT_ORDER_TYPE);
  };

  const fetchMorePages = () => {
    setParams((oldParams) => ({
      ...oldParams,
      page: oldParams.page + 1,
    }));
  };

  if (error) {
    return (
      <View>
        <Text>Error!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.reset, { borderColor: loading ? '#e3e3e3' : '#2976ca' }]}
        onPress={resetOrder}
        disabled={loading}
      >
        <Text
          style={[styles.resetText, { color: loading ? '#b3b3b3' : '#2976fa' }]}
        >
          reset
        </Text>
      </TouchableOpacity>
      {loading ? (
        <View style={styles.mask}>
          <ActivityIndicator size="large" color="#2976fa" />
        </View>
      ) : null}
      <FlatList
        style={styles.list}
        data={fullList}
        ref={listRef}
        renderItem={({ item }) => <CoinRow coinData={item} />}
        keyExtractor={(item) => item.id}
        stickyHeaderIndices={[0]}
        onEndReached={fetchMorePages}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            {CoinTableHeadSettings.map((item) => (
              <CoinTableHead
                key={item.displayText}
                displayText={item.displayText}
                isSortableField={item.isSortableField}
                headStyles={item.headStyles}
                field={item.field}
                sortListBy={sortListBy}
                activeField={prevSortField}
                direction={sortDirection}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '94%',
    maxWidth: 480,
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  mask: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: 510,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(244,244,244,0.5)',
  },
  reset: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 4,
    marginBottom: 8,
  },
  resetText: {
    fontWeight: 'bold',
  },
  list: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomColor: 'rgba(80, 80, 80, 0.1)',
    borderBottomWidth: 1,
  },
  numberCell: {
    width: '35%',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nameCell: {
    width: '30%',
    textAlign: 'left',
  },
});

const CoinTableHeadSettings: Omit<
  CoinTableHeadProps,
  'sortListBy' | 'direction' | 'activeField'
>[] = [
  {
    displayText: 'Name',
    isSortableField: false,
    headStyles: styles.nameCell,
  },
  {
    displayText: 'Price(USD)',
    isSortableField: true,
    field: 'price',
    headStyles: styles.numberCell,
  },
  {
    displayText: 'Total Volume',
    isSortableField: true,
    field: 'volume',
    headStyles: styles.numberCell,
  },
];

export default CoinTable;
