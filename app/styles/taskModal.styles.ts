import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    maxWidth: 400,
    width: '85%',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
  },
  input: {
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 100,
    padding: 15,
    textAlignVertical: 'top',
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    flex: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    elevation: 5,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default styles;
