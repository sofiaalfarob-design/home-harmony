export type Frequency = "daily" | "weekly" | "monthly" | "unscheduled";
export type User = "A" | "B";

export interface Chore {
  id: string;
  title: string;
  description: string;
  user: User;
  frequency: Frequency;
  completed: boolean;
  priority: "low" | "medium" | "high";
  icon?: string;
}

export const FREQUENCY_ORDER: Frequency[] = ["daily", "weekly", "monthly"];

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  daily: "Diarias",
  weekly: "Semanales",
  monthly: "Mensuales",
  unscheduled: "Sin fecha",
};

export const DEFAULT_CHORES: Chore[] = [
  // DIARIAS
  {
    id: "breakfast-a",
    title: "Preparar mi Desayuno",
    description: "Desayuno Usuario A",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "breakfast-b",
    title: "Preparar su Desayuno",
    description: "Desayuno Usuario B",
    user: "B",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "dishes-am",
    title: "Lavar platos (AM) + Limpieza Cocina",
    description: "Lavar platos de la mañana y limpiar la cocina",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "lunch-prep",
    title: "Preparar Almuerzo + Lavar platos",
    description: "Preparar almuerzo y lavar los platos después",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "post-workout",
    title: "Preparar Post-entreno",
    description: "Preparar comida post-entreno",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "medium",
  },
  {
    id: "make-bed",
    title: "Acomodar Cama y Sillón",
    description: "Ordenar cama y sillón",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "medium",
  },
  {
    id: "robot-vacuum",
    title: "Poner / Limpiar el Bot (Aspiradora)",
    description: "Encender y limpiar la aspiradora robot",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "medium",
  },
  {
    id: "pepper-food",
    title: "Comida de Pepper",
    description: "Alimentar a Pepper",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "cat-litter",
    title: "Limpiar caja de arena",
    description: "Limpiar la caja de arena de los gatos",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "sweep-light",
    title: "Barrer (Superficial)",
    description: "Barrido rápido de superficies",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "medium",
  },
  {
    id: "fold-laundry",
    title: "Doblar y Guardar Ropa",
    description: "Doblar y guardar ropa limpia",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "medium",
  },
  {
    id: "dinner-prep",
    title: "Preparar Cena",
    description: "Preparar cena para ambos",
    user: "B",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "dishes-dinner",
    title: "Lavar platos de la Cena",
    description: "Lavar platos de las comidas",
    user: "B",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "dishes-dry-store",
    title: "Secar y Guardar TODOS los platos",
    description: "Guardar platos limpios",
    user: "B",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "trash-recycle",
    title: "Sacar Basura y Reciclaje",
    description: "Sacar la basura y reciclaje diariamente",
    user: "B",
    frequency: "daily",
    completed: false,
    priority: "high",
  },
  {
    id: "tidy-general",
    title: "Orden General (Recoger objetos)",
    description: "Recoger y ordenar objetos dispersos",
    user: "A",
    frequency: "daily",
    completed: false,
    priority: "medium",
  },
  // SEMANALES
  {
    id: "bathroom-maintenance",
    title: "Limpiar el baño (Mantenimiento)",
    description: "Limpieza de baño (Lun/Vie)",
    user: "B",
    frequency: "weekly",
    completed: false,
    priority: "high",
  },
  {
    id: "floors-deep",
    title: "Limpieza profunda de pisos",
    description: "Limpieza profunda (Martes)",
    user: "B",
    frequency: "weekly",
    completed: false,
    priority: "high",
  },
  {
    id: "laundry-full",
    title: "Lavar y Secar Ropa",
    description: "Ciclo completo de lavado (Mar/Jue)",
    user: "A",
    frequency: "weekly",
    completed: false,
    priority: "high",
  },
  {
    id: "appliances-clean",
    title: "Limpieza Técnica (Electrodomésticos)",
    description: "Limpiar electrodomésticos (Miércoles)",
    user: "B",
    frequency: "weekly",
    completed: false,
    priority: "medium",
  },
  {
    id: "grocery-shopping",
    title: "Comprar comida / Ir a la Feria",
    description: "Compras semanales (Jueves)",
    user: "A",
    frequency: "weekly",
    completed: false,
    priority: "high",
  },
  {
    id: "fridge-clean",
    title: "Limpiar la Refri",
    description: "Limpiar refrigerador (Viernes)",
    user: "A",
    frequency: "weekly",
    completed: false,
    priority: "medium",
  },
  {
    id: "meal-prep",
    title: "Meal Prep",
    description: "Preparación de comidas (Viernes)",
    user: "A",
    frequency: "weekly",
    completed: false,
    priority: "high",
  },
  {
    id: "bathroom-deep",
    title: "Lavado profundo de baño",
    description: "Limpieza profunda (Sábado)",
    user: "B",
    frequency: "weekly",
    completed: false,
    priority: "medium",
  },
  {
    id: "patio-clean",
    title: "Limpiar el patio",
    description: "Limpieza del patio (Sábado)",
    user: "A",
    frequency: "weekly",
    completed: false,
    priority: "low",
  },
  {
    id: "fruit-prep",
    title: "Picar fruta y alistar vegetales",
    description: "Preparación de frutas y vegetales (Domingo)",
    user: "A",
    frequency: "weekly",
    completed: false,
    priority: "medium",
  },
  // QUINCENALES
  {
    id: "pepper-bath",
    title: "Bañar a Pepper",
    description: "Baño de Pepper (Quincenal)",
    user: "B",
    frequency: "weekly",
    completed: false,
    priority: "medium",
  },
  // MENSUALES
  {
    id: "sheets-wash",
    title: "Lavar sábanas y edredones",
    description: "Lavado mensual de ropa de cama",
    user: "A",
    frequency: "monthly",
    completed: false,
    priority: "medium",
  },
  {
    id: "closet-deep",
    title: "Ordenar espacio profundo (Clóset)",
    description: "Organización profunda del clóset",
    user: "A",
    frequency: "monthly",
    completed: false,
    priority: "low",
  },
  {
    id: "windows-clean",
    title: "Limpiar ventanas",
    description: "Limpieza mensual de ventanas",
    user: "A",
    frequency: "monthly",
    completed: false,
    priority: "low",
  },
  {
    id: "cats-bath",
    title: "Bañar a los gatos",
    description: "Baño mensual de los gatos",
    user: "A",
    frequency: "monthly",
    completed: false,
    priority: "medium",
  },
];

export function loadChores(): Chore[] {
  if (typeof window === "undefined") return DEFAULT_CHORES;

  try {
    const saved = localStorage.getItem("homeHarmonyChores");
    if (saved) {
      const parsed = JSON.parse(saved) as Chore[];
      // Si hay datos guardados pero son significativamente menos que los nuevos,
      // usar DEFAULT_CHORES (migración de versión antigua)
      if (parsed.length < DEFAULT_CHORES.length - 5) {
        return DEFAULT_CHORES;
      }
      return parsed;
    }
  } catch {
    // ignore invalid storage
  }

  return DEFAULT_CHORES;
}

export function saveChores(chores: Chore[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("homeHarmonyChores", JSON.stringify(chores));
}
