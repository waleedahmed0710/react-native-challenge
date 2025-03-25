import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: 20,
    padding: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: COLORS.alternate,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 10,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default styles;
