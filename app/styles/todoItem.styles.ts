import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  optionsButton: {
    marginLeft: 5,
    padding: 8,
  },
  taskCheckbox: {
    marginRight: 10,
  },
  taskItem: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextCompleted: {
    color: COLORS.taskComplete,
    textDecorationLine: 'line-through',
  },
  todoId: {
    color: COLORS.warning,
    fontSize: 12,
    marginLeft: 10,
  },
});

export default styles;
