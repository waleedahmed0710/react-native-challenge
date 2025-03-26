import { StyleSheet } from 'react-native';
import COLORS from '@/app/constants/colors';

const styles = StyleSheet.create({
  activeIndicator: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    bottom: 8,
    position: 'absolute',
    right: 0,
    top: 8,
    width: 4,
  },
  activeMenuItem: {
    backgroundColor: COLORS.lightPrimary,
  },
  activeMenuItemText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
    width: 60,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  backdrop: {
    backgroundColor: COLORS.overlay,
    flex: 1,
    flexDirection: 'row',
  },
  backdropTouchable: {
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  drawerContainer: {
    backgroundColor: COLORS.white,
    bottom: 0,
    elevation: 5,
    height: '100%',
    position: 'absolute',
    right: 0,
    shadowColor: COLORS.black,
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    top: 0,
    width: '80%',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItem: {
    alignItems: 'center',
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    position: 'relative',
  },
  menuItemText: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 16,
  },
  menuItems: {
    padding: 16,
  },
  safeArea: {
    flex: 1,
  },
  signOutItem: {
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 1,
    marginTop: 20,
  },
  signOutText: {
    color: COLORS.error,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userSection: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    padding: 20,
  },
});

export default styles;
