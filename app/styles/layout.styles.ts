import { StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

const styles = StyleSheet.create({
  addTaskButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    bottom: 30,
    elevation: 8,
    height: 60,
    justifyContent: 'center',
    left: '50%',
    marginLeft: -30,
    position: 'absolute',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    width: 60,
    zIndex: 1000,
  },
  floatingButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    elevation: 8,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    top: 60,
    width: 56,
    zIndex: 1000,
  },
});

export default styles;
