import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    borderRadius: 8,
    minWidth: 120,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
  },
  cancelButtonText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: '600',
  },
  colorOption: {
    borderRadius: 15,
    height: 30,
    marginRight: 8,
    width: 30,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 10,
  },
  input: {
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 15,
    padding: 10,
  },
  inputLabel: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  selectedColorOption: {
    borderColor: COLORS.black,
    borderWidth: 2,
  },
});

export default styles;
