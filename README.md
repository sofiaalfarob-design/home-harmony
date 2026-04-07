# Home Harmony

A modern household chore management application built with React, TypeScript, and Tailwind CSS. Helps couples or roommates coordinate daily, weekly, and monthly chores with progress tracking, notifications, and gamification features.

## Features

- **Multi-User Support**: Assign chores to different users (A/B)
- **Flexible Scheduling**: Daily, weekly, and monthly chore frequencies
- **Chained Tasks**: Dependencies between chores (e.g., laundry workflow)
- **Progress Tracking**: Visual progress bars and milestone celebrations
- **Smart Notifications**: ADHD-friendly nudges and chain completion alerts
- **Gamification**: Confetti rewards and progress milestones
- **Responsive Design**: Works on mobile and desktop
- **Offline-First**: Uses localStorage for data persistence

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: React hooks + localStorage
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd home-harmony
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Feature components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and business logic
│   ├── chores.ts       # Chore management logic
│   └── notifications.ts # Notification handling
├── pages/              # Page components
├── test/               # Test files
└── ...
```

## Key Concepts

### Chore Types
- **Daily**: Tasks that need to be done every day
- **Weekly**: Tasks scheduled for specific days of the week
- **Monthly**: Tasks that rotate monthly
- **Once**: One-time tasks that are removed after completion

### User Assignment
Chores are assigned to users "A" or "B" to distribute workload fairly.

### Chained Tasks
Some chores depend on others (e.g., "Wash clothes" must be done before "Fold clothes"). The app prevents starting dependent tasks until prerequisites are complete.

### Progress Tracking
- Daily progress bars
- Milestone notifications at 25%, 50%, 75%, and 100% completion
- Visual feedback with confetti animations

## Development

### Adding New Chores

Edit the `DEFAULT_CHORES` array in `src/lib/chores.ts`:

```typescript
{
  id: "unique-id",
  title: "Chore description",
  user: "A", // or "B"
  frequency: "daily", // "weekly", "monthly", or "once"
  icon: "icon-name", // from Lucide icons
  priority: "high", // "medium" or "low"
  // Optional fields for weekly/monthly:
  dayOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
  // Optional for chained tasks:
  chainId: "laundry",
  chainStep: 1,
  chainDependsOn: "previous-chore-id"
}
```

### Testing

Run the test suite:
```bash
npm run test
```

Tests are located in `src/test/` and use Vitest with React Testing Library.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is built with [Lovable](https://lovable.dev) and follows their terms of service.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
