import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  currentPage: {
    backgroundColor: COLORS.primary,
  },
  currentPageText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  disabledNavigationButton: {
    backgroundColor: COLORS.warning,
  },
  disabledNavigationButtonText: {
    color: COLORS.white,
  },
  ellipsis: {
    color: COLORS.warning,
    fontSize: 10,
    marginHorizontal: 1,
  },
  navigationButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 90,
  },
  navigationButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  pageIndicator: {
    color: COLORS.warning,
    fontSize: 12,
    marginBottom: 10,
    marginTop: 8,
    textAlign: 'center',
  },
  pageNumber: {
    alignItems: 'center',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 1,
    width: 30,
  },
  pageNumberText: {
    color: COLORS.warning,
    fontSize: 14,
  },
  pageNumbersContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  paginationButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paginationContainer: {
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 1,
    marginTop: 16,
    paddingVertical: 10,
  },
});

export default styles;
