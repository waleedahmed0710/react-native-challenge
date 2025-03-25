import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  actionButton: {
    padding: 8,
  },
  categoryActions: {
    flexDirection: 'row',
  },
  categoryBorder: {
    borderLeftWidth: 5,
  },
  categoryCount: {
    color: COLORS.alternate,
    fontSize: 14,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
});

export default styles;
