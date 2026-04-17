# 🏠 Home Harmony - Documentación Técnica

**Sistema de gestión de tareas domésticas para parejas con distribución equilibrada 65/35**

## 📋 Descripción del Proyecto

Home Harmony es una aplicación web moderna construida con React 18 y TypeScript que facilita la coordinación de tareas domésticas entre dos personas. Implementa un sistema de distribución de carga de trabajo equilibrado (65/35) con diseño ADHD-friendly y persistencia offline-first.

### 🎯 Objetivos Principales

- **Distribución Equilibrada**: Mantener balance 65/35 entre usuarios A y B
- **Seguimiento Visual**: Progreso diario, semanal y mensual con indicadores claros
- **Accesibilidad**: Diseño que cumple estándares WCAG AA+ para usuarios con ADHD
- **Persistencia**: Datos guardados localmente sin necesidad de backend
- **Responsive**: Funciona perfectamente en móvil, tablet y desktop

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

| Categoría | Tecnología | Versión | Propósito |
|-----------|------------|---------|-----------|
| **Frontend** | React | 18.3.1 | Framework UI con hooks |
| **Lenguaje** | TypeScript | 5.2.2 | Type safety y DX |
| **Build Tool** | Vite | 5.4.21 | Desarrollo rápido + SWC |
| **Styling** | Tailwind CSS | 3.4.0 | Utility-first CSS |
| **UI Components** | shadcn/ui | - | Componentes accesibles |
| **Base Components** | Radix UI | - | Primitivos accesibles |
| **Icons** | Lucide React | 0.462.0 | Iconografía consistente |
| **Persistence** | localStorage | - | Almacenamiento offline |
| **Testing** | Vitest | 1.3.1 | Unit testing |
| **E2E Testing** | Playwright | 1.40.1 | Testing end-to-end |

### Estructura de Carpetas

```
home-harmony/
├── config/              # ⚙️ Configuraciones centralizadas
├── docs/                # 📚 Documentación completa
├── src/                 # 💻 Código fuente
│   ├── main.tsx         # 🚀 Entry point
│   ├── App.tsx          # 🎯 Componente principal
│   ├── index.css        # 🎨 Estilos globales
│   ├── components/      # 🧩 Componentes reutilizables
│   └── lib/             # 🔧 Utilidades y datos
├── tests/               # 🧪 Configuración de testing
├── public/              # 📁 Assets estáticos
└── dist/                # 📦 Build output (generado)
```

## 🚀 Guía de Instalación y Desarrollo

### Prerrequisitos

- **Node.js**: 18.0.0 o superior
- **npm**: 8.0.0 o superior (viene con Node.js)
- **Git**: Para control de versiones
- **Navegador moderno**: Chrome 90+, Firefox 88+, Safari 14+

### Instalación

1. **Clonar el repositorio**
```bash
git clone <YOUR_GIT_URL>
cd home-harmony
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Verificar instalación**
```bash
npm run type-check  # Verificar tipos TypeScript
npm run lint        # Ejecutar linter
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```
La aplicación estará disponible en: **http://localhost:8081**

### Scripts Disponibles

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",           // Build de producción
  "preview": "vite preview",       // Vista previa del build
  "test": "vitest",                // Tests unitarios
  "test:ui": "vitest --ui",        // Tests con interfaz visual
  "lint": "eslint src --ext ts,tsx", // Linting
  "type-check": "tsc --noEmit"     // Verificación de tipos
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores (Fresh & Clean)

| Color | Hex | Uso | Contraste WCAG |
|-------|-----|-----|----------------|
| Background | `#E6FAF5` | Fondo principal | - |
| Foreground | `#382F52` | Texto principal | AA+ |
| Primary | `#2950A3` | Acciones, User A | AA+ |
| Success | `#D8E280` | Completado, User B | AA+ |

### Diseño Visual

- **Glassmorphism**: Efectos de vidrio con `backdrop-blur`
- **Border Radius**: 20px estándar para cards
- **Sombras**: Sistema de sombras sutiles para profundidad
- **Typography**: Jerarquía clara con pesos consistentes
- **Espaciado**: Sistema de 4px para consistencia

### Componentes Base

La aplicación utiliza componentes de `shadcn/ui` construidos sobre Radix UI:

- **Accordion**: Para agrupar tareas por frecuencia
- **AlertDialog**: Para confirmaciones de eliminación/reset
- **Avatar**: Para mostrar iniciales de usuarios
- **Badge**: Para frecuencias, prioridades y estados
- **AspectRatio**: Para mantener proporciones en gráficos

## 📊 Modelo de Datos

### Chore Interface

```typescript
interface Chore {
  id: string              // UUID único
  title: string           // Título de la tarea
  description: string     // Descripción detallada
  user: "A" | "B"         // Usuario asignado
  frequency: Frequency    // Frecuencia de ejecución
  completed: boolean      // Estado de completado
  priority: Priority      // Nivel de prioridad
}
```

### Tipos Definidos

```typescript
type Frequency = "daily" | "weekly" | "monthly" | "unscheduled"
type User = "A" | "B"
type Priority = "low" | "medium" | "high"
```

### Datos Iniciales

La aplicación incluye **31 tareas predefinidas** organizadas por:

- **16 Diarias**: Desayunos, comidas, limpieza, mascotas, orden
- **10 Semanales**: Baño, pisos, ropa, compras, meal prep
- **1 Quincenal**: Baño de mascota
- **4 Mensuales**: Sábanas, closet, ventanas, mascotas

## 🔄 Flujos de Usuario

### Vista Home
- Resumen del progreso diario
- Distribución visual A/B
- Acciones rápidas (Reset Daily, Add Task)

### Vista Tasks
- Formulario colapsable para nuevas tareas
- Gráfico de distribución en la parte superior
- Lista organizada por frecuencia (Accordion)
- Filtro para mostrar/ocultar completadas

### Vista Stats
- Gráfico circular de distribución 65/35
- Tarjetas con estadísticas detalladas
- Explicación del objetivo de balance

### Vista Profile
- Información de ambos usuarios
- Conteo de tareas asignadas
- Avatares con iniciales

## 🧪 Testing Strategy

### Unit Tests (Vitest)
```bash
npm run test
```
- **Componentes**: Renderizado correcto, interacciones
- **Utilidades**: Funciones puras, cálculos
- **Estado**: Gestión correcta de datos

### E2E Tests (Playwright)
```bash
npx playwright test
```
- **User Flows**: Creación, edición, eliminación de tareas
- **Navegación**: Cambio entre vistas
- **Persistencia**: Datos guardados correctamente

### Testing Coverage
- **Componentes críticos**: 90%+ coverage
- **Funciones de negocio**: 100% coverage
- **Edge cases**: Estados de error, validaciones

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
```

Esto genera:
- **dist/index.html**: HTML optimizado
- **dist/assets/**: CSS y JS minificados
- **Gzip compression**: Archivos comprimidos

### Configuración de Hosting

La aplicación es **static-first** y puede desplegarse en:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Con GitHub Actions
- **Cualquier CDN**: Los archivos en `dist/` son estáticos

### Variables de Entorno

No se requieren variables de entorno para funcionalidad básica. Para futuras extensiones:

```bash
# .env.local
VITE_API_URL=https://api.homeharmony.com
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## 🔧 Configuración de Desarrollo

### VS Code Extensions Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-playwright.playwright"
  ]
}
```

### Pre-commit Hooks (Futuro)

```bash
# Con Husky
npm run type-check
npm run lint
npm run test
```

## 📈 Métricas y Monitoreo

### Performance
- **Lighthouse Score**: 95+ en todas las categorías
- **Bundle Size**: < 250KB gzipped
- **First Paint**: < 1.5s
- **Time to Interactive**: < 2s

### Analytics (Futuro)
- **User Engagement**: Tiempo en cada vista
- **Task Completion**: Tasa de completado por frecuencia
- **Error Tracking**: Errores de JavaScript

## 🔒 Seguridad

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
">
```

### Data Sanitization
- **Input validation**: Todos los inputs sanitizados
- **XSS prevention**: React automáticamente escapa contenido
- **localStorage**: Datos serializados como JSON seguro

## 🚀 Roadmap

### Versión 1.1 (Próximo mes)
- [ ] Notificaciones push para tareas pendientes
- [ ] Exportar/importar datos
- [ ] Temas oscuro/claro

### Versión 1.2 (2 meses)
- [ ] Sincronización multi-dispositivo
- [ ] Equipos múltiples
- [ ] Analytics avanzados

### Versión 2.0 (3-6 meses)
- [ ] Backend API
- [ ] Autenticación de usuarios
- [ ] Integración con calendarios

## 🤝 Contribución

### Proceso de Desarrollo
1. **Fork** el repositorio
2. **Crear branch** para feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commits** siguiendo conventional commits
4. **Pull Request** con descripción detallada
5. **Code Review** y merge

### Estándares de Código
- **TypeScript strict**: Sin `any`, tipos explícitos
- **ESLint**: Reglas de Airbnb + custom
- **Prettier**: Formateo automático
- **Testing**: 80%+ coverage mínimo

## 📞 Soporte

### Issues
- **Bug reports**: Template detallado con pasos para reproducir
- **Feature requests**: Descripción clara del problema a resolver
- **Questions**: Usar discussions para preguntas generales

### Documentación Relacionada
- **[User Flows](USER_FLOWS.md)**: Experiencia de usuario detallada
- **[Architecture](ARCHITECTURE.md)**: Arquitectura técnica
- **[Config](CONFIG.md)**: Configuración del proyecto

---

**Versión**: 1.0.0
**Última actualización**: 17 de abril de 2026
**Mantenedor**: @sofia

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
