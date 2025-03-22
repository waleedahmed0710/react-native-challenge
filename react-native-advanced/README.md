# 📱 React Native Advanced Demo App

This is a feature-rich React Native application built with scalable architecture, offline persistence, animated UI, and modular state management using modern libraries.

---

## ✨ Features

- 🔀 Multi-screen navigation with React Navigation
- ⚙️ Zustand for global state management with `AsyncStorage` persistence
- 🔄 Infinite scroll & pull-to-refresh via `@tanstack/react-query`
- 📡 Offline support — view, update, and create posts while offline
- 🧠 Optimistic updates for create/update actions
- 💬 Toast feedback using `react-native-toast-message`
- 🎨 Modern UI via `react-native-paper` + Tailwind styling
- 🎥 Smooth animations with `react-native-reanimated`
- 🧪 Typed with TypeScript for type safety
- ✅ Component-level testing using React Native Testing Library

---

## 📦 Tech Stack

| Library                      | Purpose                            |
|-----------------------------|------------------------------------|
| React Native                | Cross-platform mobile framework    |
| TypeScript                  | Type safety                        |
| Zustand                     | State management                   |
| AsyncStorage                | Offline data persistence           |
| React Query                 | API fetching & caching             |
| React Native Paper          | UI component library               |
| React Native Toast Message  | Toast notifications                |
| React Native Reanimated     | Animation engine                   |
| React Navigation            | Navigation & routing               |
| Tailwind RN Classnames      | Utility-first styling              |

---

## 🚀 Getting Started

### 1. Clone the repo & install dependencies

```bash
git clone https://github.com/yourusername/react-native-advanced.git
cd react-native-advanced
npm install
```
### 2. Run the app
For Android
```bash
npx react-native run-android
```
For iOS (macOS only)
```bash
npx pod-install
npx
react-native run-ios
```

## 📁 Folder Structure
```
src/
├── api/               # Fetch functions (e.g., fetchPosts)
├── components/        # Reusable UI components (e.g., PostCard)
├── hooks/             # Custom React hooks (e.g., usePaginatedPosts)
├── screens/           # Screen components (Home, Details, Create)
├── services/          # QueryClient & network utilities
├── store/             # Zustand store & actions
```

## 🧠 App Functionality
### ✅ Home Screen
- Infinite scroll post list from JSONPlaceholder
- Pull-to-refresh
- Network status bar
- Button to create a new post
- Offline fallback using local storage
### ✅ Details Screen
- View full post details
- Edit and save title/body
- Offline edits sync later
- Delete post with confirmation
### ✅ Create Post Screen
- Add new post with title/body
- Offline creation support
- Shows success/error toasts

## 🧪 Run tests
```bash
npm test
```
- __tests__/PostCard.test.tsx
- Components use testID for querying

## 📸 Animations
Implemented via react-native-reanimated:

- FadeInUp on post entry
- Spring animation on pull-to-refresh bounce

## 🧠 State Management
Using Zustand with persist middleware:

- Stores post list and offline changes
- Syncs edits and new posts when back online

## 📄 License
MIT
