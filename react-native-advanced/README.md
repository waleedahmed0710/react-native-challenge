# React Native Advanced Task Manager

A task management application built with React Native, Redux, and TypeScript.

## Features

- Create, update, and delete tasks
- Categorize tasks
- Set task priorities and due dates
- Offline support
- Filter and sort tasks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

## Mock Server

The application can use a json-server as a mock API for development and testing.

### Running the Mock Server

To start the json-server, run:

```bash
npm run mock-server
# or
yarn mock-server
```

This will start the server at http://localhost:3000 with the following endpoints:
- GET /tasks - Get all tasks
- GET /tasks/:id - Get a specific task
- POST /tasks - Create a new task
- PATCH /tasks/:id - Update a task
- DELETE /tasks/:id - Delete a task
- GET /categories - Get all categories
- GET /categories/:id - Get a specific category
- POST /categories - Create a new category
- PATCH /categories/:id - Update a category
- DELETE /categories/:id - Delete a category

### Configuring the API

The application can be configured to use either the in-memory mock API or the json-server. To change this setting, modify the `src/config/api.config.ts` file:

```typescript
// Set this to true to use the local json-server
// Set to false to use the in-memory mock API
export const USE_JSON_SERVER = true; // Change this to true to use json-server
```

## Project Structure

- `src/components` - Reusable UI components
- `src/screens` - Application screens
- `src/navigation` - Navigation configuration
- `src/store` - Redux store, slices, and middleware
- `src/services` - API services
- `src/types` - TypeScript type definitions
- `src/utils` - Utility functions
- `src/config` - Configuration files

## Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## License

This project is licensed under the MIT License.
