# 🤝 Guía de Contribución - Home Harmony

¡Gracias por tu interés en contribuir a Home Harmony! Esta guía te ayudará a entender cómo contribuir efectivamente al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Testing](#testing)
- [Pull Requests](#pull-requests)
- [Reportar Issues](#reportar-issues)

## 🤟 Código de Conducta

Este proyecto sigue un código de conducta para asegurar un ambiente inclusivo y respetuoso. Al participar, te comprometes a:

- **Respeto**: Tratar a todos con respeto y consideración
- **Inclusividad**: Aceptar contribuciones de cualquier persona
- **Colaboración**: Ayudar a otros contribuidores cuando sea posible
- **Calidad**: Mantener altos estándares de código y documentación

## 🚀 Cómo Contribuir

### Tipos de Contribuciones

1. **🐛 Bug Fixes**: Corrección de errores reportados
2. **✨ Features**: Nuevas funcionalidades
3. **📚 Documentation**: Mejoras en documentación
4. **🎨 UI/UX**: Mejoras en diseño e interfaz
5. **🧪 Testing**: Nuevos tests o mejoras en cobertura
6. **🏗️ Architecture**: Mejoras en estructura del código

### Primeros Pasos

1. **Fork** el repositorio
2. **Clona** tu fork: `git clone https://github.com/YOUR_USERNAME/home-harmony.git`
3. **Crea una branch**: `git checkout -b feature/nueva-funcionalidad`
4. **Instala dependencias**: `npm install`
5. **Verifica setup**: `npm run dev`

## ⚙️ Configuración del Entorno

### Prerrequisitos

```bash
# Node.js 18+
node --version  # Debe ser 18.0.0 o superior

# npm 8+
npm --version   # Debe ser 8.0.0 o superior

# Git
git --version   # Cualquier versión reciente
```

### VS Code Extensions Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "esbenp.prettier-vscode",
    "ms-playwright.playwright",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-eslint"
  ]
}
```

### Configuración Local

1. **Instalar dependencias**
```bash
npm install
```

2. **Verificar configuración**
```bash
npm run type-check  # Verificar TypeScript
npm run lint        # Ejecutar linter
npm run test        # Ejecutar tests
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 🔄 Proceso de Desarrollo

### 1. Elegir una Issue

- Revisa las [issues abiertas](https://github.com/YOUR_REPO/issues)
- Elige una issue etiquetada como `good first issue` si eres nuevo
- Comenta en la issue para indicar que vas a trabajar en ella

### 2. Crear una Branch

```bash
# Para features
git checkout -b feature/nombre-descriptivo

# Para bug fixes
git checkout -b fix/nombre-del-bug

# Para documentación
git checkout -b docs/mejora-documentacion

# Para refactorización
git checkout -b refactor/nombre-del-cambio
```

### 3. Desarrollar

- **Commits pequeños** y descriptivos
- **Testea** tus cambios regularmente
- **Sigue** los estándares de código
- **Documenta** cambios significativos

### 4. Testing

```bash
# Tests unitarios
npm run test

# Tests E2E (requiere servidor corriendo)
npx playwright test

# Verificar tipos
npm run type-check

# Linting
npm run lint
```

### 5. Commit

Usa [Conventional Commits](https://conventionalcommits.org/):

```bash
# Features
git commit -m "feat: add new task priority system"

# Fixes
git commit -m "fix: resolve icon loading error in task cards"

# Documentation
git commit -m "docs: update user flows for new features"

# Refactoring
git commit -m "refactor: simplify chore filtering logic"
```

### 6. Push y Pull Request

```bash
# Push tu branch
git push origin feature/nueva-funcionalidad

# Crea un Pull Request desde GitHub
# - Título descriptivo
# - Descripción detallada de cambios
# - Referencia a issues relacionadas
# - Screenshots si aplica
```

## 📏 Estándares de Código

### TypeScript

- **Strict mode**: Siempre usar tipos explícitos
- **No any**: Evitar `any` excepto en casos excepcionales
- **Interfaces**: Definir interfaces para objetos complejos
- **Enums**: Usar tipos union en lugar de enums cuando sea posible

```typescript
// ✅ Bueno
type Frequency = "daily" | "weekly" | "monthly" | "unscheduled"

// ❌ Evitar
enum Frequency {
  Daily = "daily",
  Weekly = "weekly"
}
```

### React

- **Functional components** con hooks
- **Custom hooks** para lógica reutilizable
- **Props typing** obligatorio
- **Keys** únicas en listas
- **useMemo/useCallback** para optimización cuando aplique

```typescript
// ✅ Componente bien tipado
interface TaskCardProps {
  task: Chore
  onToggle: (id: string) => void
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  // ...
}
```

### CSS/Tailwind

- **Utility-first**: Usar clases de Tailwind
- **Responsive**: Mobile-first approach
- **Custom properties**: Para colores y valores repetidos
- **Consistent spacing**: Sistema de espaciado consistente

```css
/* ✅ Usar CSS custom properties */
:root {
  --color-primary: #2950A3;
  --border-radius: 20px;
}
```

### Nombres y Convenciones

- **Componentes**: PascalCase (`TaskCard`, `UserAvatar`)
- **Funciones**: camelCase (`addTask`, `updateChore`)
- **Variables**: camelCase (`taskForm`, `userCounts`)
- **Archivos**: kebab-case (`task-card.tsx`, `user-avatar.tsx`)
- **Constantes**: SCREAMING_SNAKE_CASE (`DEFAULT_CHORES`)

## 🧪 Testing

### Unit Tests (Vitest)

```typescript
// src/components/__tests__/TaskCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskCard } from '../TaskCard'

describe('TaskCard', () => {
  it('renders task title', () => {
    const mockTask = {
      id: '1',
      title: 'Test Task',
      completed: false,
      // ... otros campos
    }

    render(<TaskCard task={mockTask} onToggle={() => {}} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })
})
```

### E2E Tests (Playwright)

```typescript
// tests/e2e/task-management.spec.ts
import { test, expect } from '@playwright/test'

test('user can create a new task', async ({ page }) => {
  await page.goto('http://localhost:8081')

  // Navegar a Tasks
  await page.click('[data-testid="nav-tasks"]')

  // Abrir formulario
  await page.click('[data-testid="schedule-task-btn"]')

  // Llenar formulario
  await page.fill('[data-testid="task-title"]', 'Nueva Tarea')
  await page.selectOption('[data-testid="task-user"]', 'A')
  await page.click('[data-testid="frequency-daily"]')

  // Crear tarea
  await page.click('[data-testid="create-task-btn"]')

  // Verificar que aparece
  await expect(page.locator('text=Nueva Tarea')).toBeVisible()
})
```

### Cobertura de Testing

- **Objetivo**: 80%+ cobertura en código crítico
- **Componentes**: 90%+ en componentes principales
- **Utilidades**: 100% en funciones puras
- **Edge cases**: Estados de error y validaciones

## 🔄 Pull Requests

### Template de PR

```markdown
## 📝 Descripción
Breve descripción de los cambios realizados.

## 🎯 Tipo de Cambio
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 📚 Documentation
- [ ] 🎨 UI/UX improvement
- [ ] 🧪 Testing
- [ ] 🏗️ Architecture

## 🔗 Issues Relacionadas
- Closes #123
- Related to #456

## 📋 Checklist
- [ ] Tests unitarios pasan
- [ ] Tests E2E pasan
- [ ] Linting pasa
- [ ] TypeScript sin errores
- [ ] Documentación actualizada
- [ ] Responsive verificado

## 🖼️ Screenshots (si aplica)
[Agregar screenshots de cambios visuales]

## 🔍 Testing Manual
Pasos para verificar los cambios:
1. Ir a la vista X
2. Hacer click en Y
3. Verificar que Z funciona
```

### Review Process

1. **Automated Checks**: CI ejecuta tests, linting, build
2. **Code Review**: Mínimo 1 reviewer aprobado
3. **Merge**: Squash merge con mensaje descriptivo
4. **Cleanup**: Eliminar branch después del merge

## 🐛 Reportar Issues

### Bug Reports

```markdown
**Descripción del Bug**
Descripción clara y concisa del problema.

**Pasos para Reproducir**
1. Ir a '...'
2. Hacer click en '....'
3. Ver error

**Comportamiento Esperado**
Qué debería pasar.

**Comportamiento Actual**
Qué está pasando.

**Screenshots**
Si aplica, agregar screenshots.

**Entorno**
- OS: [e.g. macOS 12.1]
- Browser: [e.g. Chrome 98]
- Version: [e.g. 1.0.0]
```

### Feature Requests

```markdown
**Problema que Resuelve**
Descripción del problema que esta feature resolvería.

**Solución Propuesta**
Descripción de la feature propuesta.

**Alternativas Consideradas**
Otras soluciones que consideraste.

**Impacto**
Cómo afectaría a usuarios existentes.
```

## 🎯 Áreas de Contribución Prioritarias

### Alto Impacto
- [ ] Sistema de notificaciones push
- [ ] Sincronización multi-dispositivo
- [ ] Modo oscuro/claro
- [ ] Exportar/importar datos

### Medio Impacto
- [ ] Gamificación (puntos, logros)
- [ ] Integración con calendarios
- [ ] Recordatorios inteligentes
- [ ] Analytics de productividad

### Bajo Impacto
- [ ] Más íconos para tareas
- [ ] Animaciones adicionales
- [ ] Temas de color alternativos
- [ ] Mejoras de accesibilidad

## 📞 Comunicación

- **Issues**: Para bugs y features
- **Discussions**: Para preguntas generales
- **Pull Requests**: Para contribuciones de código
- **Discord/Slack**: Para comunicación en tiempo real (si existe)

## 🙏 Reconocimiento

¡Todas las contribuciones son valoradas! Los contribuidores serán:

- Mencionados en el CHANGELOG
- Agregados al archivo de contribuidores
- Reconocidos en releases

---

**Última actualización**: 17 de abril de 2026</content>
<parameter name="filePath">/Users/sofia/Documents/home-harmony/docs/CONTRIBUTING.md