# Home Harmony - Configuración del Proyecto

## 📁 Estructura de Carpetas

```
home-harmony/
├── config/              # Configuraciones centralizadas
│   ├── eslint.config.js # Reglas de linting
│   ├── postcss.config.js # Configuración PostCSS
│   ├── tailwind.config.ts # Tema Tailwind + colores personalizados
│   ├── tsconfig.json     # Configuración TypeScript base
│   ├── tsconfig.app.json # Configuración app específica
│   ├── tsconfig.node.json # Configuración Node.js
│   ├── vite.config.ts    # Configuración de build
│   └── vitest.config.ts  # Configuración de testing
├── docs/                # Documentación completa
├── src/                 # Código fuente
├── tests/               # Testing (Playwright)
├── public/              # Assets estáticos
└── dist/                # Build output (generado)
```

## 🎨 Paleta de Colores (Tailwind Config)

```typescript
// config/tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Fresh & Clean Palette
        background: '#E6FAF5',    // Light Turquoise
        foreground: '#382F52',    // Deep Purple/Navy
        primary: '#2950A3',       // Royal Blue
        success: '#D8E280',       // Lime Green
      }
    }
  }
}
```

## 🔧 Scripts Disponibles

```json
// package.json scripts
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",           // Build de producción
  "preview": "vite preview",       // Vista previa del build
  "test": "vitest",                // Ejecutar tests
  "lint": "eslint src --ext ts,tsx", // Linting
  "type-check": "tsc --noEmit"     // Verificación de tipos
}
```

## 📦 Dependencias Principales

### Runtime
- `react` ^18.3.1 - Framework UI
- `react-dom` ^18.3.1 - Renderizado DOM
- `@radix-ui/*` - Componentes accesibles
- `lucide-react` ^0.462.0 - Íconos
- `tailwindcss` ^3.4.0 - CSS utility-first

### Development
- `vite` ^5.4.21 - Build tool
- `@vitejs/plugin-react-swc` - React con SWC
- `typescript` ^5.2.2 - TypeScript
- `eslint` ^9.0.0 - Linting
- `vitest` ^1.3.1 - Testing
- `playwright` ^1.40.1 - E2E testing

## 🚀 Configuración de Desarrollo

### Vite Config
```typescript
// config/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    host: true
  }
})
```

### TypeScript Config
```json
// config/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

## 🧪 Testing Setup

### Vitest Config
```typescript
// config/vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
})
```

### Playwright Config
```typescript
// tests/playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8081'
  }
})
```

## 📋 Checklist de Configuración

- [x] ESLint configurado para TypeScript + React
- [x] Tailwind CSS con colores personalizados
- [x] TypeScript con paths absolutos
- [x] Vite con SWC para builds rápidos
- [x] Vitest para testing unitario
- [x] Playwright para testing E2E
- [x] PostCSS para procesamiento CSS
- [x] Configuración responsive completa

## 🔄 Workflows de Desarrollo

### Desarrollo Local
1. `npm run dev` - Servidor en http://localhost:8081
2. `npm run type-check` - Verificar tipos
3. `npm run lint` - Ejecutar linter

### Testing
1. `npm run test` - Tests unitarios
2. `npx playwright test` - Tests E2E

### Producción
1. `npm run build` - Generar build optimizado
2. `npm run preview` - Vista previa del build

---

**Última actualización**: 17 de abril de 2026</content>
<parameter name="filePath">/Users/sofia/Documents/home-harmony/docs/CONFIG.md