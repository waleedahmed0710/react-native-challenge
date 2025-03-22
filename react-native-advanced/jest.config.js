module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@react-native-community|react-native-paper|react-native-vector-icons)/)',
    ],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
    }, 
  };