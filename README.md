# PRITECH React Native Task Manager

A simple Expo React Native task management app built with TypeScript, Expo Router, reusable components, local device storage, and a small public API seed.

## Setup

Install dependencies:

```bash
npm install
```

Start the Expo app:

```bash
npx expo start
```

Then open the project in Expo Go on a mobile device, or run it on an Android/iOS simulator from the Expo CLI menu.

Run quality checks:

```bash
npm run typecheck
npm run lint
```

## Implemented

- Task list screen with clean UI, search, status filters, and empty states
- Add task screen with title, description, status selection, and validation
- Task details screen with task information and actions
- Mark task as completed or not completed
- Delete task with a confirmation modal
- Local task persistence using Expo SecureStore
- First-launch starter tasks fetched from JSONPlaceholder, with bundled fallback tasks if the API is unavailable
- Simple Expo Router navigation between list, add, and details screens
- Reusable components organized into atoms, molecules, and organisms

## Task Data

Each task contains:

- `title`
- `description`
- `completed`
- `createdAt`

## Public API

On first launch, if no local tasks exist, the app fetches starter tasks from:

```text
https://jsonplaceholder.typicode.com/todos?_limit=4
```

Those tasks are converted into the local task shape and saved on the device.
