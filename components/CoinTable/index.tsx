import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRef } from 'react';
import services from '../../services';
import useApiRequest from '../../hooks/useApiRequest';
import CoinRow from '../CoinRow';
import { CoinMarketData, MarketsParams, OrderType } from '../../services/types';
import usePagination from '../../hooks/usePagination';

const defaultMarketParams: MarketsParams = {
  vsCurrency: 'usd',
  page: 1,
  perPage: 25,
  order: 'gecko_desc',
};

const CoinTable = () => {
  const { data, error, params, loading, setParams } = useApiRequest(
    services.getMarket,
    defaultMarketParams
  );

  const listRef = useRef<FlatList<CoinMarketData>>(null);

  const { fullList } = usePagination(data, params);

  const sortListBy = (order: OrderType) => {
    if (!listRef.current) return;
    listRef.current.scrollToOffset({ offset: 0 });
    setParams((oldParams) => ({
      ...oldParams,
      order,
      page: 1,
    }));
  };

  const resetOrder = () => {
    if (!listRef.current) return;
    listRef.current.scrollToOffset({ offset: 0 });
    setParams((oldParams) => ({
      ...oldParams,
      order: defaultMarketParams.order,
      page: 1,
    }));
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
          <ActivityIndicator size="large" />
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
            <View style={styles.nameCell}>
              <Text>Name</Text>
            </View>
            <TouchableOpacity
              style={styles.numberCell}
              onPress={() => sortListBy('price_desc')}
            >
              <Text>Price(USD)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberCell}
              onPress={() => sortListBy('volume_desc')}
            >
              <Text>Total Volume</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '90%',
    maxWidth: 460,
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
  },
  nameCell: {
    width: '30%',
    textAlign: 'left',
  },
});

export default CoinTable;
