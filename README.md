# 🏠 Home Harmony

**Gestión de tareas domésticas para parejas con distribución equilibrada 65/35**

Una aplicación moderna para coordinar tareas diarias, semanales y mensuales entre dos personas, con seguimiento de progreso y diseño ADHD-friendly.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

La aplicación estará disponible en: **http://localhost:8081**

## 📁 Estructura del Proyecto

```
home-harmony/
├── config/           # Archivos de configuración
│   ├── eslint.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig*.json
│   ├── vite.config.ts
│   └── vitest.config.ts
├── docs/             # Documentación completa
│   ├── README.md     # Documentación técnica detallada
│   └── USER_FLOWS.md # Flujos de usuario
├── src/              # Código fuente
│   ├── components/   # Componentes reutilizables
│   ├── lib/          # Utilidades y datos
│   └── ...
├── tests/            # Configuración de testing
│   ├── playwright.config.ts
│   └── playwright-fixture.ts
└── public/           # Assets estáticos
```

## 📖 Documentación

- **[Documentación Técnica](docs/README.md)** - Guía completa de desarrollo
- **[Flujos de Usuario](docs/USER_FLOWS.md)** - Experiencia de usuario detallada
- **[Arquitectura](docs/README.md#architecture)** - Diseño del sistema

## 🎯 Características Principales

- ✅ **Distribución 65/35** - Balance equilibrado de carga de trabajo
- ✅ **31 tareas predefinidas** - Lista completa de tareas domésticas
- ✅ **4 frecuencias** - Diarias, semanales, mensuales, sin fecha
- ✅ **Sistema de prioridades** - Baja, media, alta
- ✅ **Íconos específicos** - Cada tarea tiene su ícono único
- ✅ **Glassmorphism UI** - Diseño moderno y accesible
- ✅ **Persistencia local** - Datos guardados en navegador
- ✅ **Responsive** - Funciona en móvil y desktop

## 🛠️ Stack Tecnológico

- **React 18** + TypeScript
- **Vite** + SWC para desarrollo rápido
- **Tailwind CSS** + shadcn/ui
- **Radix UI** para accesibilidad
- **Lucide React** para íconos
- **localStorage** para persistencia

## 📱 Vistas de la Aplicación

1. **🏠 Home** - Resumen del día y progreso
2. **📝 Tasks** - Gestión completa de tareas
3. **📊 Stats** - Distribución de carga de trabajo
4. **👤 Profile** - Información de usuarios

## 🎨 Diseño

- **Paleta Fresh & Clean**: #E6FAF5, #382F52, #2950A3, #D8E280
- **Glassmorphism** - Efectos de vidrio con backdrop-blur
- **ADHD-Friendly** - Contraste WCAG AA+, jerarquía clara
- **Responsive** - Adaptable a todos los tamaños de pantalla

---

**Versión**: 1.0.0
**Última actualización**: 17 de abril de 2026</content>
<parameter name="filePath">/Users/sofia/Documents/home-harmony/README.md# Home Harmony

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
