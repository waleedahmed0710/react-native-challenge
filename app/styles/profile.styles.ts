import { StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

export default StyleSheet.create({
  actions: {
    alignItems: 'center',
    marginBottom: 36,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    height: 100,
    justifyContent: 'center',
    marginBottom: 16,
    width: 100,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 40,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
  },
  cancelButtonText: {
    color: COLORS.black,
    fontWeight: '600',
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  editActionButton: {
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 8,
    minWidth: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 8,
  },
  email: {
    color: COLORS.alternate,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  infoItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 4,
  },
  infoValue: {
    color: COLORS.alternate,
    fontSize: 16,
  },
  linkItem: {
    alignItems: 'center',
    borderBottomColor: COLORS.borderGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 24,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 24,
    padding: 20,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingInfo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  settingItem: {
    alignItems: 'center',
    borderBottomColor: COLORS.borderGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  signOutText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  usernameInput: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: 'center',
  },
});
