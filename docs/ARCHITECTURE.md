# 🏗️ Arquitectura de Home Harmony

## 📁 Estructura del Código Fuente

```
src/
├── main.tsx              # Entry point de la aplicación
├── App.tsx               # Componente principal con navegación
├── index.css             # Estilos globales + Tailwind
├── components/
│   ├── ui.tsx           # Componentes base reutilizables
│   └── ...              # Componentes específicos (futuros)
└── lib/
    ├── chores.ts        # Datos y lógica de tareas
    └── utils.ts         # Utilidades generales (futuras)
```

## 🧩 Componentes Principales

### App.tsx - Componente Principal
```typescript
// Estado global de la aplicación
const [currentView, setCurrentView] = useState<"home" | "tasks" | "stats" | "profile">("home")
const [chores, setChores] = useState<Chore[]>(() => loadChores())
const [showCompleted, setShowCompleted] = useState(true)
const [taskForm, setTaskForm] = useState(DEFAULT_TASK_FORM)

// Funciones principales
const updateChore = (id: string, changes: Partial<Chore>) => { ... }
const addTask = () => { ... }
const removeTask = () => { ... }
```

### chores.ts - Gestión de Datos
```typescript
// Tipos principales
export type Frequency = "daily" | "weekly" | "monthly" | "unscheduled"
export type User = "A" | "B"

export interface Chore {
  id: string
  title: string
  description: string
  user: User
  frequency: Frequency
  completed: boolean
  priority: "low" | "medium" | "high"
}

// Funciones de persistencia
export function loadChores(): Chore[] { ... }
export function saveChores(chores: Chore[]) { ... }
```

## 🔄 Flujo de Datos

```
localStorage
    ↓
loadChores() → DEFAULT_CHORES (31 tareas)
    ↓
App State (useState)
    ├─ chores[] - Array de tareas
    ├─ currentView - Vista actual
    ├─ taskForm - Estado del formulario
    └─ showCompleted - Filtro de completadas
    ↓
useMemo computaciones
    ├─ filteredChores - Tareas filtradas
    ├─ frequencyGroups - Agrupadas por frecuencia
    ├─ userCounts - Estadísticas A/B
    └─ dailyProgress - Progreso diario %
    ↓
Render Views (Home/Tasks/Stats/Profile)
    ↓
User Interactions
    ↓
updateChore() / addTask() / removeTask()
    ↓
saveChores() → localStorage
```

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
/* index.css */
:root {
  --background: #E6FAF5;  /* Light Turquoise */
  --foreground: #382F52;  /* Deep Purple/Navy */
  --primary: #2950A3;     /* Royal Blue */
  --success: #D8E280;     /* Lime Green */
}
```

### Componentes UI (ui.tsx)
```typescript
// Componentes base exportados
export {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogTitle,
  AspectRatio, Avatar, Badge, ImageWithFallback
}
```

### Íconos por Tarea
```typescript
// TASK_ICONS mapping en App.tsx
const TASK_ICONS: Record<string, React.ComponentType> = {
  "breakfast-a": Coffee,
  "breakfast-b": Utensils,
  "dishes-am": Waves,
  // ... 28 más
}
```

## 📱 Vistas de la Aplicación

### 1. Home View
- **Propósito**: Resumen rápido del estado del día
- **Componentes**: Progress bars, user counts, quick actions
- **Estado usado**: dailyProgress, userCounts, todayTasks

### 2. Tasks View
- **Propósito**: Gestión completa de tareas
- **Componentes**: Task form, task list, distribution chart
- **Estado usado**: chores, taskForm, showCompleted, frequencyGroups

### 3. Stats View
- **Propósito**: Visualización de distribución de carga
- **Componentes**: Donut chart, user cards, goal explanation
- **Estado usado**: userCounts

### 4. Profile View
- **Propósito**: Información de usuarios
- **Componentes**: User avatars, task counts
- **Estado usado**: userCounts

## 🔧 Funciones de Gestión

### addTask()
```typescript
const addTask = () => {
  if (!taskForm.title.trim()) return

  const newChore: Chore = {
    id: `task-${Date.now()}`,
    title: taskForm.title.trim(),
    description: taskForm.description.trim() || "Tarea sin descripción.",
    user: taskForm.user,
    frequency: taskForm.frequency,
    completed: false,
    priority: taskForm.priority,
  }

  setChores(current => [newChore, ...current])
  setTaskForm(DEFAULT_TASK_FORM)
  setCurrentView("tasks")
}
```

### updateChore()
```typescript
const updateChore = (id: string, changes: Partial<Chore>) => {
  setChores(current =>
    current.map(chore =>
      chore.id === id ? { ...chore, ...changes } : chore
    )
  )
}
```

### removeTask()
```typescript
const removeTask = () => {
  if (!deleteTarget) return
  setChores(current => current.filter(chore => chore.id !== deleteTarget.id))
  setDeleteTarget(null)
}
```

## 📊 Computaciones useMemo

### filteredChores
```typescript
const filteredChores = useMemo(() => {
  return chores.filter(chore => {
    if (!showCompleted && chore.completed) return false
    return true
  })
}, [chores, showCompleted])
```

### frequencyGroups
```typescript
const frequencyGroups = useMemo(() => {
  const groups: Record<Frequency, Chore[]> = {
    daily: [], weekly: [], monthly: [], unscheduled: []
  }
  filteredChores.forEach(chore => groups[chore.frequency].push(chore))
  return groups
}, [filteredChores])
```

### userCounts
```typescript
const userCounts = useMemo(() => {
  const counts = { A: 0, B: 0 }
  chores.forEach(chore => counts[chore.user]++)
  const total = counts.A + counts.B || 1
  return {
    counts,
    percentA: Math.round((counts.A / total) * 100),
    percentB: Math.round((counts.B / total) * 100)
  }
}, [chores])
```

## 🎯 Principios de Arquitectura

### 1. Single Responsibility
- Cada componente tiene una responsabilidad clara
- Funciones puras para lógica de negocio
- Separación clara entre UI y lógica

### 2. State Management Simple
- React hooks nativos (useState, useMemo)
- localStorage para persistencia
- No se necesita Redux/Zustand para esta escala

### 3. Type Safety
- TypeScript estricto en toda la aplicación
- Interfaces bien definidas para datos
- Tipos específicos para frecuencias y usuarios

### 4. Performance
- useMemo para computaciones costosas
- Filtrado eficiente de tareas
- Renderizado condicional inteligente

### 5. Accessibility
- Radix UI para componentes accesibles
- Contraste WCAG AA+ verificado
- Navegación por teclado completa

### 6. Responsive Design
- Tailwind CSS con breakpoints
- Grid layouts adaptativos
- Componentes que se ajustan al tamaño de pantalla

## 🚀 Escalabilidad

### Futuras Mejoras Posibles
- **Backend API**: Para sincronización multi-dispositivo
- **Base de datos**: Para usuarios múltiples y equipos
- **Notificaciones**: Push notifications para recordatorios
- **Gamificación**: Sistema de puntos y logros
- **Analytics**: Seguimiento de hábitos y productividad

### Módulos Extensibles
- **Auth**: Sistema de autenticación
- **Teams**: Gestión de equipos múltiples
- **Calendar**: Integración con calendarios externos
- **Reports**: Análisis avanzados de productividad

---

**Versión**: 1.0.0
**Última actualización**: 17 de abril de 2026</content>
<parameter name="filePath">/Users/sofia/Documents/home-harmony/docs/ARCHITECTURE.md