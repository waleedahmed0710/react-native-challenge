# Service Mania App

A mobile application built with Expo and React Native that allows users to browse and manage services.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (for Mac users) or Android Emulator

## Installation

1. Clone the repository:

```bash
git clone
cd into project folder
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Running the App

### Development Mode

Start the Expo development server:

```bash
npx expo start
```

This will open the Expo Developer Tools in your browser. From here, you can:

- Press `i` to open in iOS Simulator (macOS only)
- Press `a` to open in Android Emulator
- Scan the QR code with your phone's camera to open in Expo Go app

### Running on Physical Devices

1. Download the Expo Go app on your iOS or Android device
2. Scan the QR code displayed in the terminal or Expo Developer Tools
3. Make sure your device is on the same network as your development machine

## Testing

The project uses Jest for testing. To run the tests:

```bash
npm test
# or
yarn test
```

### Running Specific Tests

```bash
npm test -- -t "ProfileScreen"
# or
yarn test -t "ProfileScreen"
```

### Test Coverage

To generate a test coverage report:

```bash
npm test -- --coverage
# or
yarn test --coverage
```

## Project Structure

```
service-mania/
├── .expo/              # Expo configuration files
├── assets/             # Images, fonts, and other static assets
├── src/                # Source code
│   ├── api/            # API configuration and base setup
│   ├── components/     # Reusable components
│   ├── constants/      # App constants including colors
│   ├── screens/        # Application screens
│   ├── services/       # API services
│   ├── store/          # State management (Zustand)
│   └── types/          # TypeScript type definitions
├── __tests__/          # Test files
├── App.tsx             # App entry point
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## Building for Production

To create a production build:

```bash
# For Android
expo build:android

# For iOS
expo build:ios
```

Or using the newer EAS Build system:

```bash
# Configure EAS
npx eas-cli build:configure

# Build for internal distribution
npx eas-cli build --platform android --profile preview
npx eas-cli build --platform ios --profile preview
```

## Troubleshooting

### Common Issues

**Metro Bundler issues:**

```bash
npx expo start --clear
```

**Dependencies issues:**

```bash
npm install --force
# or
yarn install --force
```

**Testing AsyncStorage issues:**

If you encounter AsyncStorage errors in tests, ensure you have the proper mocks set up in your test files or in a global setup file.
