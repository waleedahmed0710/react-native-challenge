# Welcome to Product Picker app 👋
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```
3. Start local json-server

   ```bash
    json-server --watch db.json --port 3001
   ```
### How to run
1. `npm install`
2. Start mock server: `npm run mock-server` (if using `json-server`)
3. `npx expo start`
4. Start `local json-server`
   `cd db` and run the command below
   ```bash
    json-server --watch db.json --port 3001
   ```
### Features
- API fetching with Redux + redux-persist
- Offline cache via AsyncStorage
- Product listing with pagination + pull-to-refresh
- Navigation via expo-router
- Product creation form
- Component + unit tests

### Trade-offs
- Used local state for form, could sync with backend
- Skipped full error boundary, but used fallback UI

### Known Issues
- Pagination is mocked (no real API paging)

