# Home Harmony - User Flows Documentation

## 📋 Overview
Home Harmony es una aplicación de gestión de tareas para hogares de dos personas con distribución de carga de trabajo equilibrada (65/35). La aplicación está diseñada con un enfoque ADHD-friendly con interfaz clara y glassmorphism.

---

## 🏠 Flow 1: Home View - Quick Summary

### Objetivo
Proporcionar una visión rápida del estado del día y el progreso general.

### User Flow
```
Usuario abre la app
    ↓
[Vista Home]
    ├─ Muestra: Distribución de tareas (porcentajes A/B)
    ├─ Muestra: Progreso de tareas diarias (%)
    ├─ Muestra: Tareas pendientes hoy
    └─ Botones de acción rápida: Reset Daily Tasks, Add New Task
    ↓
Usuario puede:
  • Hacer click en "Add New Task" → Ir a Tasks
  • Hacer click en "Reset Daily Tasks" → Confirmar reset → Tareas diarias se reinician
  • Hacer click en navegación inferior → Cambiar a otra vista
```

### Detalles
- **Audiencia**: Usuario que quiere un resumen rápido al abrir la app
- **Información mostrada**:
  - Gráfico de distribución (cónico) A% / B%
  - Porcentaje de tareas completadas hoy
  - Contador de tareas diarias vs sin fecha
- **Acciones disponibles**:
  - Reset Daily Tasks (confirma antes de ejecutar)
  - Add New Task (abre formulario en Tasks)

---

## 📝 Flow 2: Create New Task

### Objetivo
Permitir agregar nuevas tareas a la lista con todos los detalles necesarios.

### User Flow
```
Usuario en cualquier vista
    ↓
[Click botón "Schedule Task" o "Add New Task"]
    ↓
[Task Form se abre/expande]
    ├─ Campo: Título (requerido)
    ├─ Campo: Asignar a (User A / User B)
    ├─ Campo: Prioridad (Baja / Media / Alta)
    ├─ Campo: Descripción (opcional)
    └─ Selector de Frecuencia:
       ├─ Diarias
       ├─ Semanales
       ├─ Mensuales
       └─ Sin fecha
    ↓
Usuario ingresa datos y hace click en "Crear Tarea"
    ↓
{Validación: ¿Título no vacío?}
  • NO → Mostrar error (silencioso)
  • SÍ → Continuar
    ↓
Nueva tarea se agrega a la lista
Form se reinicia (vacía campos)
Vista cambia a "Tasks"
    ↓
[Tarea visible en la lista con íconos y badges]
```

### Detalles
- **Audencia**: Cualquier usuario que necesite adicionar una tarea
- **Campos del formulario**:
  - Título: Campo de texto (placeholder: "e.g., Limpiar la cocina")
  - Asignar a: Select (User A, User B)
  - Prioridad: Select (Baja, Media, Alta)
  - Descripción: Textarea (opcional)
  - Frecuencia: 4 botones (Daily, Weekly, Monthly, Unscheduled)
- **Validación**: Solo puede crear si el título no está vacío
- **Post-crear**: Form se limpia automáticamente para rápida re-entrada

---

## ✅ Flow 3: Mark Task as Complete/Incomplete

### Objetivo
Permitir marcar tareas como completadas o revertir el estado.

### User Flow
```
Usuario en vista [Tasks]
    ↓
[Busca tarea en lista]
    ↓
[Ve tarjeta de tarea con detalles]
    ├─ Icono específico de la tarea
    ├─ Título y descripción
    ├─ Badges: Frecuencia, Prioridad, Estado (si está completa)
    └─ Botones de acción
    ↓
Usuario hace click en botón "✓" (check) en la tarjeta
    ↓
{¿Estado actual?}
  • Incompleta → Marca como completada (visual: tachada, color gris)
  • Completada → Marca como incompleta (visual: normal)
    ↓
Cambio se guarda en localStorage automáticamente
```

### Alternativas
- **Mostrar completadas**: Checkbox en Tasks que controla visibilidad
- **"Mostrar completadas" OFF** → Solo muestra tareas pendientes
- **"Mostrar completadas" ON** → Muestra todas (completadas tachadas)

### Detalles
- **Ubicación**: Botón dentro de cada tarjeta de tarea
- **Visual feedback**: 
  - Incompleta: Texto normal, badge de estado no visible
  - Completada: Texto tachado, color más apagado, badge "Completada"
- **Persistencia**: Se guarda automáticamente en localStorage

---

## 📊 Flow 4: View Task Distribution (Stats)

### Objetivo
Ver estadísticas detalladas de distribución de carga de trabajo entre usuarios.

### User Flow
```
Usuario en cualquier vista
    ↓
[Hace click en ícono "Stats" en navegación inferior]
    ↓
[Vista Stats se carga]
    ├─ Título: "Distribución 65/35"
    ├─ Gráfico circular (conic-gradient):
    │  └─ User A: color azul (#2950A3)
    │  └─ User B: color verde (#D8E280)
    ├─ Tarjetas de información:
    │  ├─ User A: Porcentaje, cantidad de tareas
    │  └─ User B: Porcentaje, cantidad de tareas
    └─ Sección "Meta": Explicación del objetivo 65/35
    ↓
Usuario puede:
  • Ver el porcentaje visualmente en gráfico
  • Ver números exactos en tarjetas
  • Navegar a otra vista o volver a Home
```

### Detalles
- **Audiencia**: Usuarios que quieren auditar la distribución de trabajo
- **Cálculo**: 
  - Total de tareas por usuario / Total de todas las tareas
  - Se recalcula automáticamente cuando se agregan/eliminan tareas
- **Visual**: Gráfico tipo "donut" con dos colores
- **Objetivo**: Mantener balance alrededor de 65/35 (Usuario A más carga)

---

## 👤 Flow 5: View Profile

### Objetivo
Ver información de los usuarios del hogar.

### User Flow
```
Usuario en cualquier vista
    ↓
[Hace click en ícono "Profile" en navegación inferior]
    ↓
[Vista Profile se carga]
    ├─ Muestra: Avatares de ambos usuarios
    ├─ Muestra: Tarjetas de usuario
    │  ├─ User A: Nombre, carga de tareas
    │  └─ User B: Nombre, carga de tareas
    └─ Información simple y clara
    ↓
Usuario puede:
  • Ver info de ambos usuarios
  • Ver cuántas tareas tiene cada uno
  • Navegar a otra vista
```

### Detalles
- **Audiencia**: Para referencia rápida de información de usuarios
- **Información mostrada**:
  - Nombre del usuario
  - Cantidad total de tareas asignadas
  - Avatar (iniciales del usuario)

---

## 🗑️ Flow 6: Delete Task

### Objetivo
Permitir eliminar tareas de la lista.

### User Flow
```
Usuario en [Tasks]
    ↓
[Ve tarjeta de tarea]
    ↓
[Hace click en botón "🗑️" (trash) en la tarjeta]
    ↓
[Modal de confirmación aparece]
    ├─ Mensaje: "¿Estás seguro de que quieres eliminar?"
    ├─ Botón: "Cancelar"
    └─ Botón: "Eliminar" (rojo/destructivo)
    ↓
{Usuario hace click en...}
  • "Cancelar" → Modal se cierra, tarea persiste
  • "Eliminar" → Tarea se elimina de la lista, modal se cierra
    ↓
{Si se eliminó}
  → localStorage se actualiza
  → Distribución de tareas se recalcula
  → Porcentajes se actualizan automáticamente
```

### Detalles
- **Seguridad**: Modal de confirmación para evitar eliminaciones accidentales
- **Ubicación**: Botón en cada tarjeta de tarea
- **Post-delete**: Las estadísticas se recalculan automáticamente

---

## 🔄 Flow 7: Reset Daily Tasks

### Objetivo
Reiniciar todas las tareas con frecuencia "Diarias" al comenzar el día.

### User Flow
```
Usuario en [Home]
    ↓
[Hace click en "Reset Daily Tasks"]
    ↓
[Modal de confirmación aparece]
    ├─ Mensaje: "¿Reiniciar todas las tareas diarias?"
    ├─ Botón: "Cancelar"
    └─ Botón: "Confirmar" (azul)
    ↓
{Usuario hace click en...}
  • "Cancelar" → Modal se cierra, tareas permanecen
  • "Confirmar" → Todas las tareas con frequency="daily" 
                   se marcan como completed: false
    ↓
{Si se confirmó}
  → Modal se cierra
  → Progreso del día vuelve a 0%
  → Tareas diarias aparecen como pendientes nuevamente
```

### Detalles
- **Uso**: Ideal al comenzar cada día
- **Afecta solo**: Tareas con frequency = "daily"
- **No afecta**: Tareas semanales, mensuales, sin fecha
- **Confirmación**: Requerida para evitar resets accidentales

---

## 🔍 Flow 8: View Tasks by Frequency

### Objetivo
Organizar y visualizar tareas agrupadas por frecuencia.

### User Flow
```
Usuario en [Tasks]
    ↓
[Scrollea hasta "All Tasks Overview"]
    ↓
[Ve 4 acordeones]
    ├─ Diarias (expandible)
    ├─ Semanales (expandible)
    ├─ Mensuales (expandible)
    └─ Tareas sin fecha (sección fija)
    ↓
Usuario hace click en acordeón "Diarias"
    ↓
[Acordeón expande/contrae]
    └─ Muestra: Lista de todas las tareas diarias
       ├─ Con íconos específicos
       ├─ Con badges (Prioridad, Estado)
       └─ Con botones de acción (Mark complete, Delete)
    ↓
Usuario puede:
  • Expandir/contraer cada frecuencia
  • Ver número de tareas por frecuencia
  • Expandir/contraer para gestionar mejor
```

### Detalles
- **Organización**: Accordion component de Radix UI
- **Orden predeterminado**: 
  1. Diarias
  2. Semanales
  3. Mensuales
  4. Sin fecha (siempre visible)
- **Información por sección**: Muestra cantidad de tareas
- **Estado**: Se expande/contrae independientemente

---

## 🧭 Flow 9: Bottom Navigation

### Objetivo
Permitir navegación rápida entre las 4 vistas principales.

### User Flow
```
Usuario en cualquier vista
    ↓
[Ve navbar fija en la parte inferior]
    ├─ 4 iconos: Home, Tasks, Stats, Profile
    └─ Icono activo resaltado en color #2950A3
    ↓
Usuario hace click en cualquier icono
    ↓
{Evalúa qué vista está activa}
  • Click en "Home" → Carga Home
  • Click en "Tasks" → Carga Tasks
  • Click en "Stats" → Carga Stats
  • Click en "Profile" → Carga Profile
    ↓
[Nueva vista se carga]
    └─ Navbar se actualiza para mostrar nuevo icono activo
```

### Detalles
- **Posición**: Fixed en la parte inferior, centrado
- **Diseño**: Navbar glassmorphic con backdrop blur
- **Ícono activo**: Indicador visual claro del estado actual
- **Accesibilidad**: Fácil acceso a cualquier sección en cualquier momento

---

## 🎨 Flow 10: Form Priority Selection

### Objetivo
Permitir seleccionar prioridad al crear una tarea.

### User Flow
```
Usuario en [Task Form]
    ↓
[Ve campo "Prioridad" con select dropdown]
    ├─ Opción: Baja
    ├─ Opción: Media (default)
    └─ Opción: Alta
    ↓
Usuario hace click en select
    ↓
[Dropdown se abre mostrando 3 opciones]
    ↓
Usuario selecciona una opción (e.g., "Alta")
    ↓
[Select actualiza valor a "Alta"]
    └─ Visual feedback inmediato
    ↓
Usuario crea tarea
    ↓
[Tarea se crea con prioridad seleccionada]
    └─ Badge de prioridad visible en tarjeta
```

### Detalles
- **Valores**:
  - Baja (low)
  - Media (medium) - DEFAULT
  - Alta (high)
- **Display**: Badge en color correspondiente en tarjeta
- **Uso**: Ayuda a priorizar tareas

---

## 📱 Responsive Design Flow

### Objetivo
Asegurar que la app funciona bien en diferentes tamaños de pantalla.

### User Flow - Desktop (lg+)
```
Pantalla ancha (≥1024px)
    ↓
[Layout: Grid 2 columnas]
├─ Columna izquierda: Vista principal (1.4fr)
└─ Columna derecha: Sidebar informativo (0.9fr)
    ├─ Resumen del día
    └─ Tips/Consejos
```

### User Flow - Tablet (md)
```
Pantalla media (768px-1023px)
    ↓
[Layout: Stack vertical]
└─ Contenido responsivo con márgenes
```

### User Flow - Mobile (sm)
```
Pantalla pequeña (<768px)
    ↓
[Layout: Full width]
    ├─ Cards se apilan
    ├─ Form se adapta (grid 1 columna)
    └─ Navbar inferior sigue siendo accesible
```

---

## 🎯 Key Design Principles Used

1. **ADHD-Friendly**
   - Clara jerarquía visual
   - Glassmorphism para menos "ruido"
   - Colores consistentes y predecibles

2. **Accesibilidad**
   - Contraste WCAG AA+
   - Confirmaciones para acciones destructivas
   - Indicadores visuales claros

3. **Persistencia**
   - localStorage guarda automáticamente cambios
   - No hay necesidad de "Guardar" manual

4. **Feedback inmediato**
   - Cambios visibles al instante
   - Animaciones suaves (transiciones CSS)
   - Estados claros (completa vs incompleta)

---

## 🎨 Color System Integration in Flows

- **#E6FAF5** - Background principal (fresco, calmante)
- **#382F52** - Texto principal (legible, no es puro negro)
- **#2950A3** - Primary CTA, botones, información User A (azul real)
- **#D8E280** - Success, información User B (verde lima)
- **White/80** - Glassmorphism backgrounds

---

## 📊 Data Flow Diagram

```
localStorage
    ↓
loadChores() → DEFAULT_CHORES (si es migración)
    ↓
App State (useState)
    ├─ chores[]
    ├─ currentView
    ├─ taskForm
    ├─ showCompleted
    └─ Otros flags
    ↓
useMemo: Computaciones
    ├─ filteredChores
    ├─ frequencyGroups
    ├─ userCounts
    └─ dailyProgress
    ↓
Render Views
    └─ Home / Tasks / Stats / Profile
    ↓
User Interactions → updateChore() / addTask() / removeTask()
    ↓
saveChores() → localStorage
```

---

## 🚀 Quick Reference

### Para USER A (Usuario A)
- Más tareas (65%)
- Responsabilidades: Desayuno, almuerzo, post-workout, ropa, mascotas, limpieza general
- Color visual: Azul (#2950A3) en stats

### Para USER B (Usuario B)
- Menos tareas (35%)
- Responsabilidades: Desayuno, cena, baño, limpieza profunda, compras
- Color visual: Verde (#D8E280) en stats

### Frecuencias Available
- **Daily** (Diarias) - 16 tareas
- **Weekly** (Semanales) - 10 tareas
- **Monthly** (Mensuales) - 5 tareas
- **Unscheduled** (Sin fecha) - Para agregar después

---

## 📝 Notas de Implementación

- **Framework**: React 18 + TypeScript
- **UI Library**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Persistence**: Browser localStorage (JSON)
- **Build**: Vite + SWC

---

**Última actualización**: 17 de abril de 2026
**Versión del documento**: 1.0
