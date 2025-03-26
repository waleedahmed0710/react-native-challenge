import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  categoryColorDot: {
    borderRadius: 8,
    height: 16,
    marginRight: 8,
    width: 16,
  },
  categoryHeaderInfo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  emptyTodosState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTodosText: {
    color: COLORS.gray,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    elevation: 5,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '85%',
  },
  modalContent: {
    marginBottom: 10,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomColor: COLORS.borderGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 10,
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
    flex: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoCheckbox: {
    marginRight: 10,
  },
  todoItem: {
    alignItems: 'center',
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 12,
  },
  todoList: {
    maxHeight: 400,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  todoTextCompleted: {
    color: COLORS.taskComplete,
    textDecorationLine: 'line-through',
  },
});

export default styles;
