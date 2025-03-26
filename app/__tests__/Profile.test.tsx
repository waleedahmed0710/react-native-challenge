import React from 'react';
import { render } from '@testing-library/react-native';
import Profile from '@/app/profile/index';

// Create mock states
const normalState = {
  username: 'TestUser',
  email: 'test@example.com',
  isEditing: false,
  newUsername: 'TestUser',
  settings: {
    darkMode: false,
    notifications: true,
    soundEffects: true,
    autoDeleteCompleted: false,
    compactView: false,
  },
  setNewUsername: jest.fn(),
  setIsEditing: jest.fn(),
  saveProfile: jest.fn(),
  toggleSetting: jest.fn(),
  handleSignOut: jest.fn(() => Promise.resolve(true)),
};

const editingState = {
  ...normalState,
  isEditing: true,
  newUsername: 'EditedUser',
};

// Mock default state
let mockProfileState = normalState;

// Mock useProfile hook
jest.mock('@/app/hooks/useProfile', () => ({
  __esModule: true,
  default: () => mockProfileState,
}));

// Mock expo modules and navigation
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20, bottom: 20, left: 0, right: 0 }),
}));

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders normal state correctly', () => {
    mockProfileState = normalState;
    const { toJSON } = render(<Profile />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders editing state correctly', () => {
    mockProfileState = editingState;
    const { toJSON } = render(<Profile />);
    expect(toJSON()).toMatchSnapshot();
  });
});
