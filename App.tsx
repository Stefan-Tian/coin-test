import { StyleSheet, View, StatusBar } from 'react-native';
import CoinTable from './components/CoinTable';

const App = () => {
  return (
    <View style={styles.container}>
      <CoinTable />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default App;
