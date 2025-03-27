# DevRn - A Modern React Native Application 🚀

DevRn is a feature-rich React Native application built with Expo. It demonstrates advanced concepts such as state management, offline support, dynamic routing, and responsive UI design. This project is ideal for developers looking to learn or implement modern mobile app development practices.

---

## Features

### Core Features
- **Multi-screen Navigation**: Built with Expo Router for file-based routing.
- **State Management**: Redux Toolkit with AsyncStorage for offline persistence.
- **CRUD Operations**: Create, read, update, and delete posts with API integration.
- **Offline Support**: Access previously loaded posts without an internet connection.
- **Search and Pagination**: Real-time search filtering and paginated post lists.
- **Network Connectivity Handling**: Alerts for network status changes.
- **Dark/Light Mode**: Responsive UI with theme support.

### Technical Highlights
- **TypeScript Integration**: Type-safe components, actions, and state.
- **Custom Components**: Reusable UI components with consistent styling.
- **Performance Optimizations**: Efficient list rendering, pagination, and optimized re-renders.
- **Error Handling**: Graceful error states with retry options.

---

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode for emulators/simulators

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/DevRn.git
   cd DevRn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Open the app:
   - Use a development build, Android emulator, iOS simulator, or Expo Go.

---

## Project Structure

### Key Directories
- **`app/`**: Contains all screens and routes, organized with file-based routing.
- **`components/`**: Reusable UI components like `ThemedText`, `Collapsible`, and `ParallaxScrollView`.
- **`hooks/`**: Custom hooks for color scheme, network status, and theme management.
- **`src/store/`**: Redux store setup with slices for state management.
- **`constants/`**: Centralized color definitions for light and dark themes.
- **`scripts/`**: Utility scripts, including a project reset script.

### Routing
- **Tabs**: `app/(tabs)/` contains tab-based navigation for Home, Explore, and Posts.
- **Dynamic Routes**: Supports dynamic routes like `/posts/[id]` for post details.

---

## Features in Detail

### Posts Management
- **View Posts**: Paginated list of posts with search functionality.
- **Create Post**: Add new posts using a floating action button.
- **Edit Post**: Update existing posts with a user-friendly form.
- **Delete Post**: Remove posts with confirmation dialogs.

### Offline Support
- Posts are cached using AsyncStorage for offline access.
- Network status is monitored using `@react-native-community/netinfo`.

### Theming
- Light and dark modes are supported using a custom `useColorScheme` hook.
- Themed components like `ThemedText` and `ThemedView` adapt to the active theme.

---

## Testing

### Unit Tests
- Written with Jest and Testing Library for React Native.
- Mocked dependencies like AsyncStorage, NetInfo, and Redux store.

### Run Tests
```bash
npm test
```

### Coverage
```bash
npm run test:coverage
```

---

## Scripts

### Development
- `npm start`: Start the Expo development server.
- `npm run android`: Run the app on an Android emulator.
- `npm run ios`: Run the app on an iOS simulator.
- `npm run web`: Start the app in a web browser.

### Project Reset
- `npm run reset-project`: Move existing files to `app-example` and create a blank `app/` directory.

---

## API Integration

### JSONPlaceholder API
- Base URL: `https://jsonplaceholder.typicode.com/posts`
- Endpoints:
  - `GET /posts`: Fetch all posts.
  - `POST /posts`: Create a new post.
  - `PUT /posts/:id`: Update a post.
  - `DELETE /posts/:id`: Delete a post.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## Screenshots

### Home Screen
![Home Screen](path/to/home-screenshot.png)

### Posts Screen
![Posts Screen](path/to/posts-screenshot.png)

---

Happy coding! 🎉
