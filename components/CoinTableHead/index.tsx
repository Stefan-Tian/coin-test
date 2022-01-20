import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { colors } from '../../styles/variables';

export type SortDirection = 'asc' | 'desc';
export type SortField = 'volume' | 'price' | 'gecko';

export interface CoinTableHeadProps {
  isSortableField: boolean;
  field?: SortField;
  headStyles: Record<string, string>;
  displayText: string;
  sortListBy: (order: SortField) => void;
  direction: SortDirection;
  activeField: SortField;
}

const CoinTableHead = ({
  isSortableField,
  field,
  headStyles,
  displayText,
  sortListBy,
  direction,
  activeField,
}: CoinTableHeadProps) => {
  const handlePress = () => {
    sortListBy(field as SortField);
  };

  if (!isSortableField) {
    return (
      <View style={headStyles}>
        <Text>{displayText}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={headStyles} onPress={handlePress}>
      <Text>{displayText}</Text>
      {activeField === field ? (
        <View style={styles.arrows}>
          <View
            style={[
              styles.arrow,
              styles.arrowUp,
              direction === 'desc' && styles.arrowInactive,
            ]}
          />
          <View
            style={[
              styles.arrow,
              styles.arrowDown,
              direction === 'asc' && styles.arrowInactive,
            ]}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrows: {
    marginLeft: 2,
    marginTop: 2,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  arrowUp: {
    borderTopWidth: 0,
    borderBottomWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: colors.primary,
    marginBottom: 2,
  },
  arrowDown: {
    borderTopWidth: 6,
    borderBottomWidth: 0,
    borderTopColor: colors.primary,
    borderBottomColor: 'transparent',
  },
  arrowInactive: {
    opacity: 0.3,
  },
});

export default CoinTableHead;
