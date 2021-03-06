import { StyleSheet, View, Text, Image } from 'react-native';
import { CoinMarketData } from '../../services/types';
import { colors } from '../../styles/variables';

const CoinRow = ({ coinData }: { coinData: CoinMarketData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image source={{ uri: coinData.image }} style={styles.icon} />
        <Text style={styles.name}>{coinData.name}</Text>
      </View>
      <Text style={styles.numberCell}>{coinData.currentPrice}</Text>
      <Text style={styles.numberCell}>{coinData.totalVolume}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingHorizontal: 18,
    borderBottomWidth: 2,
    borderBottomColor: colors.tableBorder,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  numberCell: {
    width: '35%',
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
    fontSize: 12,
  },
  name: {
    fontSize: 12,
  },
  nameContainer: {
    display: 'flex',
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CoinRow;
