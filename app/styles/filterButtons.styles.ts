import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  activeFilterButton: {
    backgroundColor: COLORS.primary,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeFilterText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  filterButton: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterContainer: {
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 4,
  },
  filterText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
