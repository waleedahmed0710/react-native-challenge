# React Native Advanced API Fetching App

## Overview
This is a React Native app that fetches posts from an API (or a mock server). It features easy navigation using React Navigation, full TypeScript support, and state management with Redux Toolkit. The app is designed for scalability and includes advanced features like offline support.

## Preview
<p align="center">
  <img src="https://github.com/user-attachments/assets/9fe23af7-567e-4735-871f-2bafd2ad5a23" width="200" height="auto" />
  <img src="https://github.com/user-attachments/assets/cc060017-3376-4a16-92a9-a48e60969d91" width="200" height="auto" />
  <img src="https://github.com/user-attachments/assets/00234a3d-ab4c-40b0-805b-1e21bc754247" width="200" height="auto" />
  <img src="https://github.com/user-attachments/assets/9084b265-6b34-49ae-8368-85773138e092" width="200" height="auto" />
</p>

## Features
- **Fetch & Display Posts:** Retrieves and displays posts from an API.
- **Navigation:** Uses React Navigation for seamless screen transitions.
- **Redux Toolkit:** Manages state effectively.
- **Offline Support:** Implements Redux Persist / AsyncStorage.
- **TypeScript:** Ensures type safety throughout the project.
- **Modular Architecture:** Organized with a structured folder layout.
- **Delete Posts (Planned):** An option to delete posts was supposed to be added if time allows.

## Folder Structure
```
├── src/
  │   ├── components/       # Reusable UI components
  │   ├── screens/          # Screens for navigation
  │   ├── store/            # Redux store & slices
  │   ├── types/            # Type definitions
  │   └── navigation/       # Navigation configuration
```

## Installation & Running the App

### Clone the Repository:
```sh
git clone https://github.com/mitchiemt11/react-native-challenge.git
cd react-native-advanced
```

### Install Dependencies:
```sh
npm install
```

### Run Metro Bundler:
```sh
npx react-native start
```

### Run on Android/iOS:
```sh
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS
```

## Assumptions & Trade-offs
- **Mock API vs Real API:** Currently using a mock API for development. If using a real API, authentication and caching strategies should be considered.
- **State Management Choice:** Redux Toolkit was chosen for scalability, though lightweight alternatives like Zustand could work.
- **Offline Support:** Implemented basic AsyncStorage caching. More advanced features like background sync can be added later.

## Known Issues & Future Improvements
- **Testing:** No unit/integration tests are included due to time constraints. Jest and React Native Testing Library can be used.
- **Polished UI:** Some screens need better styling and animations for a smoother user experience.
- **Error Handling:** More robust error handling can be added for API failures and offline mode.
- **Performance Enhancements:** Could implement React Query or SWR for improved caching and background fetching.


## Conclusion
This app serves as a solid foundation for an advanced API-fetching React Native app. With more time, UI/UX improvements, better test coverage, and performance optimizations would be the next priorities.

## Author
Mitchell Mutandah

## License
This project is licensed under the MIT License - see the LICENSE file for details.
