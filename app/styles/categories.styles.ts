import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  addCategoryFAB: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    bottom: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    position: 'absolute',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addRight: {
    right: 10,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyStateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  emptyStateText: {
    color: COLORS.gray,
    fontSize: 16,
    marginBottom: 24,
    marginTop: 12,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingText: {
    color: COLORS.gray,
    fontSize: 16,
    marginTop: 10,
  },
  randomizeButton: {
    left: 10,
    // alignSelf: 'flex-start',
  },
  randomizeButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  subtitle: {
    color: COLORS.alternate,
    fontSize: 14,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default styles;
