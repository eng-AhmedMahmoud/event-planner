# Event Planner

Event Planner is a web application designed to help users manage and organize events efficiently. It provides features such as event creation, editing, deletion, and status management.

## Features

- Create new events with details such as name, date, time, location, and description.
- Edit existing events.
- Delete events.
- Mark events as completed or pending.
- Cache events locally for offline access.
- Validate event data before submission.

## Technologies Used

- React
- TypeScript
- React Router
- Vitest (for testing)
- React Testing Library (for testing)
- React Hot Toast (for notifications)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/event-planner.git
   cd event-planner
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Running the Application

To start the development server, run:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Running Tests

To run the tests using Vitest, run:

```bash
pnpm test
```

For an interactive UI provided by Vitest UI, run:

```bash
pnpm test:ui
```

## Project Structure

```plaintext
event-planner/
├── public/
├── src/
│   ├── components/
│   │   ├── EventForm.tsx
│   │   ├── EventList.tsx
│   │   └── __tests__/
│   │       └── EventForm.test.tsx
│   ├── context/
│   │   ├── EventContext.tsx
│   │   ├── EventProvider.tsx
│   │   └── EventProvider.test.tsx
│   ├── hooks/
│   │   ├── useEventCache.ts
│   │   ├── useEventCache.test.ts
│   │   └── useEventValidation.ts
│   ├── reducers/
│   │   └── eventReducer.ts
│   ├── types/
│   │   └── event.ts
│   ├── App.tsx
│   ├── AppWrapper.tsx
│   └── AppWrapper.test.tsx
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
