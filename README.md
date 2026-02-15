# System Bet Calculator

A system bet calculator for calculating potential winnings. The application allows you to calculate all possible combinations, payouts, and profits for system bets.

## 🚀 Features

- **System Bet Calculation** - Support for various systems (e.g., 2/3, 3/5, etc.)
- **Dark Mode** - Toggle between light and dark themes
- **Form Validation** - Validation of all input data
- **Responsive Design** - Works on all devices
- **Smooth Transitions** - Animations when switching themes
- **Loading Indicator** - Visual feedback during calculation

## 📋 Requirements

- Node.js (version 20.19.0 or higher, or 22.12.0+)
- npm or yarn

## 🛠️ Installation

1. Clone the repository or navigate to the project folder:
```bash
cd system-bet-calculator
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

### Development Mode

Start the dev server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### Production Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

After building, you can preview the result:
```bash
npm run preview
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## 📁 Project Structure

```
system-bet-calculator/
├── src/
│   ├── assets/          # Static resources (logo)
│   ├── components/      # React components
│   │   ├── BetForm/     # Bet form components
│   │   └── shared/      # Reusable components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript types
│   ├── utils/           # Utilities and helper functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── public/              # Public files
├── index.html           # HTML template
└── package.json         # Dependencies and scripts
```

## 🎯 Usage

1. **Enter System Type:**
   - Required Wins (e.g., 2) - Number of required wins
   - Total Selections (e.g., 3) - Total number of selections
   - Example: 2/3 means 2 wins from 3 selections

2. **Enter Odds:**
   - After filling in the system type, fields for entering odds will appear
   - Enter the odds for each selection

3. **Enter Total Stake:**
   - After filling in all odds, a field for total stake will appear
   - Enter the amount you want to bet

4. **Calculate Results:**
   - Click the "Calculate Results" button
   - You will see all possible combinations, payouts, and profit

## 🎨 Dark Mode

Click the theme toggle button in the top right corner to switch between light and dark themes. Your choice is saved in localStorage.

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter
- `npm test` - Run tests

## 📦 Main Dependencies

- `react` & `react-dom` - React library
- `react-icons` - Icons
- `clsx` & `tailwind-merge` - Class name utilities
- `tailwindcss` - CSS framework

## 🔧 Configuration

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 📄 License

Project created for personal use.

## 👤 Author

System Bet Calculator

---

**Note:** Make sure you have the correct Node.js version installed before running the project.
