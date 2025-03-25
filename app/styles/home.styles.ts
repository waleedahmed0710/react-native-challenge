import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    color: COLORS.warning,
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    marginTop: 10,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 16,
  },
  listContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    elevation: 2,
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listContentContainer: {
    paddingBottom: 70,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.gray,
    fontSize: 16,
    marginTop: 10,
  },
  subtitle: {
    color: COLORS.warning,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'right',
  },
  taskList: {
    backgroundColor: COLORS.transparent,
    flex: 1,
  },
  welcomeText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'right',
  },
});

export default styles;
