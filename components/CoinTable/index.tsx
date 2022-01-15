import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import services from '../../services';
import useApiRequest from '../../hooks/useApiRequest';
import useSortList from '../../hooks/useSortList';
import CoinRow from '../CoinRow';
import { CoinMarketData } from '../../services/types';

const defaultMarketParams = {
  vsCurrency: 'usd',
};

const CoinTable = () => {
  const { data, loading, error } = useApiRequest(
    services.getMarket,
    defaultMarketParams
  );
  const { sortedList, sortListBy, resetOrder } =
    useSortList<CoinMarketData>(data);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.reset} onPress={resetOrder}>
        <Text>reset filter</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={sortedList}
        renderItem={({ item }) => <CoinRow coinData={item} />}
        keyExtractor={(item) => item.name}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.nameCell}
              onPress={() => sortListBy('name')}
            >
              <Text>Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberCell}
              onPress={() => sortListBy('currentPrice')}
            >
              <Text>Price(USD)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberCell}
              onPress={() => sortListBy('totalVolume')}
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
    width: '90%',
    maxWidth: 460,
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  reset: {
    padding: 6,
    borderWidth: 2,
    borderColor: '#2976ca',
    color: '#2976fa',
    fontWeight: 'bold',
    outline: 0,
    width: 120,
    textAlign: 'center',
    borderRadius: 4,
    marginBottom: 8,
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
    cursor: 'pointer',
  },
  nameCell: {
    width: '30%',
    textAlign: 'left',
    cursor: 'pointer',
  },
});

export default CoinTable;
