import { StyleSheet, View, Text, FlatList } from 'react-native';
import services from '../../services';
import useApiRequest from '../../hooks/useApiRequest';
import CoinRow from '../CoinRow';

const defaultMarketParams = {
  vsCurrency: 'usd',
};

const CoinTable = () => {
  const { data, loading, error } = useApiRequest(
    services.getMarket,
    defaultMarketParams
  );

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
      <FlatList
        data={data}
        renderItem={({ item }) => <CoinRow coinData={item} />}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.nameCell}>Name</Text>
            <Text style={styles.numberCell}>Price(USD)</Text>
            <Text style={styles.numberCell}>Total Volume</Text>
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
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 30,
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
