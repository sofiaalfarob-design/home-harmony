import {
    AlertCircle,
    Apple,
    Archive,
    ArrowRight,
    Bath,
    Bed,
    Cat,
    CheckCircle2,
    Cloud,
    Coffee,
    Dog,
    Droplets,
    Dumbbell,
    Flower2,
    FolderOpen,
    Grid,
    Heart,
    Home,
    ListChecks,
    PaintRoller,
    PieChart,
    Plus,
    Refrigerator,
    Salad,
    Settings,
    Shirt,
    ShoppingBag,
    ShoppingCart,
    Sparkles,
    Sun,
    Trash2,
    Trees,
    UserCircle2,
    Utensils,
    Waves,
    Wind
} from "lucide-react";
import { ComponentType, useEffect, useMemo, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AspectRatio,
    Avatar,
    Badge
} from "./components/ui";
import {
    Chore,
    User as ChoreUser,
    Frequency,
    FREQUENCY_LABELS,
    FREQUENCY_ORDER,
    loadChores,
    saveChores,
} from "./lib/chores";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "stats", label: "Stats", icon: PieChart },
  { id: "profile", label: "Profile", icon: UserCircle2 },
] as const;

const USERS: ChoreUser[] = ["A", "B"];
const USER_LABELS: Record<ChoreUser, string> = { A: "User A", B: "User B" };
const TASK_ICON_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' rx='18' fill='%232950A3'/%3E%3Cpath d='M20 34l10 10 18-22' fill='none' stroke='%23D8E280' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const TASK_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  // Diarias
  "breakfast-a": Coffee,
  "breakfast-b": Utensils,
  "dishes-am": Waves,
  "lunch-prep": Utensils,
  "post-workout": Dumbbell,
  "make-bed": Bed,
  "robot-vacuum": Settings,
  "pepper-food": Dog,
  "cat-litter": Cat,
  "sweep-light": Wind,
  "fold-laundry": Shirt,
  "dinner-prep": Utensils,
  "dishes-dinner": Waves,
  "dishes-dry-store": Archive,
  "trash-recycle": Trash2,
  "tidy-general": Grid,
  // Semanales
  "bathroom-maintenance": Droplets,
  "floors-deep": PaintRoller,
  "laundry-full": Waves,
  "appliances-clean": Settings,
  "grocery-shopping": ShoppingBag,
  "fridge-clean": Refrigerator,
  "meal-prep": Salad,
  "bathroom-deep": Droplets,
  "patio-clean": Trees,
  "fruit-prep": Apple,
  // Quincenales
  "pepper-bath": Bath,
  // Mensuales
  "sheets-wash": Cloud,
  "closet-deep": FolderOpen,
  "windows-clean": Sun,
  "cats-bath": Heart,
  // Legacy IDs (if any)
  "kitchen-dishes": Utensils,
  "plant-care": Flower2,
  "deep-clean": Wind,
  "shelf-fix": AlertCircle,
  "groceries": ShoppingCart,
};

const DEFAULT_TASK_FORM = {
  title: "",
  description: "",
  frequency: "daily" as Frequency,
  user: "A" as ChoreUser,
  priority: "medium" as "low" | "medium" | "high",
};

export default function App() {
  const initialChores = loadChores();
  const [chores, setChores] = useState<Chore[]>(() => initialChores);
  const [currentView, setCurrentView] = useState<"home" | "tasks" | "stats" | "profile">
    (() => (initialChores.length > 0 ? "tasks" : "home"));
  const [showCompleted, setShowCompleted] = useState(true);
  const [activeTaskTab, setActiveTaskTab] = useState<Frequency>("daily");
  const [taskForm, setTaskForm] = useState(DEFAULT_TASK_FORM);
  const [deleteTarget, setDeleteTarget] = useState<Chore | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    saveChores(chores);
  }, [chores]);

  const filteredChores = useMemo(() => {
    return chores.filter((chore) => {
      if (!showCompleted && chore.completed) return false;
      return true;
    });
  }, [chores, showCompleted]);

  const frequencyGroups = useMemo(() => {
    const groups: Record<Frequency, Chore[]> = {
      daily: [],
      weekly: [],
      monthly: [],
      unscheduled: [],
    };
    filteredChores.forEach((chore) => groups[chore.frequency].push(chore));
    return groups;
  }, [filteredChores]);

  const todayTasks = frequencyGroups.daily;
  const unscheduledTasks = frequencyGroups.unscheduled;

  const userCounts = useMemo(() => {
    const counts = { A: 0, B: 0 } as Record<ChoreUser, number>;
    chores.forEach((chore) => counts[chore.user]++);
    const total = counts.A + counts.B || 1;
    return {
      counts,
      percentA: Math.round((counts.A / total) * 100),
      percentB: Math.round((counts.B / total) * 100),
    };
  }, [chores]);

  const dailyProgress = useMemo(() => {
    const completed = todayTasks.filter((chore) => chore.completed).length;
    return todayTasks.length ? Math.round((completed / todayTasks.length) * 100) : 0;
  }, [todayTasks]);

  const updateChore = (id: string, changes: Partial<Chore>) => {
    setChores((current) => current.map((chore) => (chore.id === id ? { ...chore, ...changes } : chore)));
  };

  const addTask = () => {
    if (!taskForm.title.trim()) return;
    const newChore: Chore = {
      id: `task-${Date.now()}`,
      title: taskForm.title.trim(),
      description: taskForm.description.trim() || "Tarea sin descripción.",
      user: taskForm.user,
      frequency: taskForm.frequency,
      completed: false,
      priority: taskForm.priority,
      icon: "",
    };
    setChores((current) => [newChore, ...current]);
    setTaskForm(DEFAULT_TASK_FORM);
    setCurrentView("tasks");
    setActiveTaskTab(taskForm.frequency);
  };

  const removeTask = () => {
    if (!deleteTarget) return;
    setChores((current) => current.filter((chore) => chore.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleteConfirmOpen(false);
  };

  const resetDailyTasks = () => {
    setChores((current) => current.map((chore) => (chore.frequency === "daily" ? { ...chore, completed: false } : chore)));
    setResetConfirmOpen(false);
  };

  const taskList = (tasks: Chore[]) => (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="rounded-[20px] border border-[#2950A3]/30 bg-white/80 p-6 text-center text-sm text-[#382F52]">
          No hay tareas aquí todavía.
        </div>
      ) : (
        tasks.map((chore) => (
          <article key={chore.id} className="group rounded-[20px] border border-white/80 bg-white/90 p-5 shadow-[0_20px_50px_rgba(25,45,91,0.07)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-[#2950A3]/15 bg-gradient-to-br from-[#E6FAF5] to-[#D8E280]/20 text-[#2950A3]">
                {(() => {
                  const IconComponent = TASK_ICONS[chore.id];
                  return IconComponent ? <IconComponent className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />;
                })()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="frequency">{FREQUENCY_LABELS[chore.frequency]}</Badge>
                  <Badge variant="priority">{chore.priority}</Badge>
                  {chore.completed && <Badge variant="status">Completada</Badge>}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className={`text-lg font-semibold ${chore.completed ? "text-slate-500 line-through" : "text-[#382F52]"}`}>
                      {chore.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{chore.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Avatar name={USER_LABELS[chore.user]} />
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteTarget(chore);
                        setDeleteConfirmOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#2950A3]/20 bg-white px-3 py-2 text-xs font-semibold text-[#2950A3] transition hover:bg-[#2950A3]/5"
                    >
                      <Trash2 className="h-3.5 w-3.5" />Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => updateChore(chore.id, { completed: !chore.completed })}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${chore.completed ? "bg-[#D8E280] text-[#382F52]" : "bg-[#2950A3] text-white hover:bg-[#1f3f7b]"}`}
              >
                <CheckCircle2 className="h-4 w-4" />
                {chore.completed ? "Completada" : "Marcar completada"}
              </button>
              <span className="text-sm text-slate-500">{USER_LABELS[chore.user]}</span>
            </div>
          </article>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#E6FAF5] text-[#382F52]">
      <div className="mx-auto max-w-7xl px-4 pb-32 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2950A3]">Home Harmony</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#382F52] sm:text-5xl">
                Calma, claridad y tareas del hogar en equilibrio.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
                Una plataforma pensada para hogares de dos personas con tareas diarias, semanales, mensuales y sin fecha. Todo organizado con menos ruido visual.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-[20px] border border-white/80 bg-gradient-to-br from-[#E6FAF5] via-white to-[#D8E280]/20 shadow-2xl shadow-slate-900/10">
                <div className="flex h-full flex-col justify-between p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#382F52]/80">Progreso diario</p>
                    <p className="mt-3 text-3xl font-semibold text-[#382F52]">{dailyProgress}% completado</p>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 rounded-full bg-white/80">
                      <div className="h-full rounded-full bg-[#2950A3] transition-all" style={{ width: `${dailyProgress}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{todayTasks.length} tareas hoy</span>
                      <span>{userCounts.counts.A} para User A</span>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-6">
            {currentView === "home" && (
              <div className="rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2950A3]">Vista rápida</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#382F52]">Tareas hoy</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentView("tasks")}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#2950A3] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2950A3]/15 transition hover:bg-[#1f3f7b]"
                  >
                    <Plus className="h-4 w-4" /> Ver tareas
                  </button>
                </div>
                <div className="mt-6 space-y-4">
                  {todayTasks.slice(0, 3).map((chore) => (
                    <div key={chore.id} className="rounded-[20px] border border-[#2950A3]/10 bg-[#F5FCFA] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[#382F52]">{chore.title}</p>
                          <p className="mt-1 text-sm text-slate-600">{USER_LABELS[chore.user]}</p>
                        </div>
                        <Badge variant="frequency">{FREQUENCY_LABELS[chore.frequency]}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === "tasks" && (
              <div className="space-y-6">
                {/* Task Distribution Header */}
                <div className="rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2950A3]">Task Management</p>
                  <h1 className="mt-2 text-2xl font-semibold text-[#382F52]">Task Distribution</h1>
                  
                  <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="mx-auto w-full max-w-xs rounded-full border border-white/80 bg-[#F5FCFA] p-8 shadow-inner shadow-slate-900/5">
                      <div className="h-48 w-48 rounded-full border border-[#2950A3]/10 bg-[#E6FAF5]" style={{ background: `conic-gradient(#2950A3 0 ${userCounts.percentA}%, #D8E280 ${userCounts.percentA}% 100%)` }}>
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white/90 text-center text-2xl font-semibold text-[#382F52] shadow-sm">
                          <div className="flex flex-col gap-1">
                            <span>User A</span>
                            <span className="text-[#2950A3]">{userCounts.percentA}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="rounded-[20px] border border-[#2950A3]/10 bg-white p-4">
                        <p className="text-sm font-semibold text-[#382F52]">User A</p>
                        <p className="mt-2 text-3xl font-semibold text-[#2950A3]">{userCounts.percentA}%</p>
                        <p className="mt-1 text-sm text-slate-600">{userCounts.counts.A} tareas</p>
                      </div>
                      <div className="rounded-[20px] border border-[#D8E280]/20 bg-white p-4">
                        <p className="text-sm font-semibold text-[#382F52]">User B</p>
                        <p className="mt-2 text-3xl font-semibold text-[#D8E280]">{userCounts.percentB}%</p>
                        <p className="mt-1 text-sm text-slate-600">{userCounts.counts.B} tareas</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Task Button */}
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 200, behavior: "smooth" });
                    setShowAddForm(!showAddForm);
                  }}
                  className="w-full rounded-[20px] border border-white/80 bg-[#2950A3] p-6 font-semibold text-white shadow-[0_30px_80px_rgba(45,70,100,0.08)] transition hover:bg-[#1f3f7b]"
                >
                  <Plus className="mr-2 inline h-5 w-5" />
                  Schedule Task
                </button>

                {/* Task Form - Collapsible */}
                {showAddForm && (
                  <div className="rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2950A3]">Nueva tarea</p>
                        <h2 className="mt-2 text-lg font-semibold text-[#382F52]">Agregar tarea</h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="text-[#382F52] hover:text-[#2950A3]"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <label className="space-y-2 text-sm text-slate-700">
                        <span>Título</span>
                        <input
                          value={taskForm.title}
                          onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })}
                          placeholder="e.g., Limpiar la cocina"
                          className="w-full rounded-2xl border border-[#2950A3]/20 bg-white px-4 py-3 text-sm text-[#382F52] outline-none focus:border-[#2950A3] focus:ring-2 focus:ring-[#2950A3]/10"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-slate-700">
                        <span>Asignar a</span>
                        <select
                          value={taskForm.user}
                          onChange={(event) => setTaskForm({ ...taskForm, user: event.target.value as ChoreUser })}
                          className="w-full rounded-2xl border border-[#2950A3]/20 bg-white px-4 py-3 text-sm text-[#382F52] outline-none focus:border-[#2950A3] focus:ring-2 focus:ring-[#2950A3]/10"
                        >
                          {USERS.map((user) => (
                            <option key={user} value={user}>
                              {USER_LABELS[user]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="space-y-2 text-sm text-slate-700">
                        <span>Prioridad</span>
                        <select
                          value={taskForm.priority}
                          onChange={(event) => setTaskForm({ ...taskForm, priority: event.target.value as "low" | "medium" | "high" })}
                          className="w-full rounded-2xl border border-[#2950A3]/20 bg-white px-4 py-3 text-sm text-[#382F52] outline-none focus:border-[#2950A3] focus:ring-2 focus:ring-[#2950A3]/10"
                        >
                          <option value="low">Baja</option>
                          <option value="medium">Media</option>
                          <option value="high">Alta</option>
                        </select>
                      </label>
                    </div>
                    <label className="mt-4 space-y-2 text-sm text-slate-700">
                      <span>Descripción</span>
                      <textarea
                        value={taskForm.description}
                        onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })}
                        placeholder="Añade más detalles sobre esta tarea..."
                        rows={3}
                        className="w-full rounded-2xl border border-[#2950A3]/20 bg-white px-4 py-3 text-sm text-[#382F52] outline-none focus:border-[#2950A3] focus:ring-2 focus:ring-[#2950A3]/10"
                      />
                    </label>
                    <div className="mt-4 grid gap-3 sm:grid-cols-4">
                      {(["daily", "weekly", "monthly", "unscheduled"] as Frequency[]).map((frequency) => (
                        <button
                          key={frequency}
                          type="button"
                          onClick={() => setTaskForm({ ...taskForm, frequency })}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${taskForm.frequency === frequency ? "border-[#2950A3] bg-[#2950A3] text-white" : "border-[#2950A3]/20 bg-white text-[#382F52] hover:border-[#2950A3]"}`}
                        >
                          {FREQUENCY_LABELS[frequency]}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addTask}
                      className="mt-4 w-full rounded-2xl bg-[#2950A3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f3f7b]"
                    >
                      Crear Tarea
                    </button>
                  </div>
                )}

                {/* Task List by Frequency */}
                <div className="rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2950A3]">All Tasks Overview</p>
                      <h2 className="mt-2 text-xl font-semibold text-[#382F52]">{chores.length} total tareas</h2>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-[#2950A3]/20 bg-white px-4 py-3 text-sm text-[#382F52]">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={showCompleted}
                          onChange={(event) => setShowCompleted(event.target.checked)}
                          className="h-4 w-4 rounded border-[#2950A3] text-[#2950A3]"
                        />
                        Mostrar completadas
                      </label>
                    </div>
                  </div>

                  <Accordion type="single" collapsible defaultValue="daily" className="space-y-4">
                    {FREQUENCY_ORDER.map((frequency) => (
                      <AccordionItem value={frequency} key={frequency} className="overflow-hidden rounded-[20px] border border-[#2950A3]/10 bg-white/90 shadow-sm">
                        <AccordionTrigger className="flex items-center justify-between gap-3 px-5 py-4 text-left text-[#382F52]">
                          <div>
                            <p className="text-base font-semibold">{FREQUENCY_LABELS[frequency]}</p>
                            <p className="mt-1 text-sm text-slate-500">({frequencyGroups[frequency].length})</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#2950A3]" />
                        </AccordionTrigger>
                        <AccordionContent className="border-t border-[#2950A3]/10 px-5 py-4">
                          {taskList(frequencyGroups[frequency])}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {unscheduledTasks.length > 0 && (
                    <div className="mt-6 rounded-[20px] border border-[#2950A3]/10 bg-[#F5FCFA] p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[#382F52]">Tareas sin fecha</p>
                          <p className="mt-1 text-sm text-slate-500">Revisa y asigna cuando estés listo.</p>
                        </div>
                        <Badge variant="status">{unscheduledTasks.length} tareas</Badge>
                      </div>
                      <div className="mt-4">{taskList(unscheduledTasks)}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentView === "stats" && (
              <div className="rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2950A3]">Estadísticas</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#382F52]">Distribución 65/35</h2>
                  </div>
                  <span className="rounded-full border border-[#2950A3]/20 bg-[#E6FAF5] px-4 py-2 text-sm text-[#382F52]">
                    {userCounts.counts.A} A / {userCounts.counts.B} B
                  </span>
                </div>
                <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="mx-auto w-full max-w-xs rounded-full border border-white/80 bg-[#F5FCFA] p-8 shadow-inner shadow-slate-900/5">
                    <div className="h-64 w-64 rounded-full border border-[#2950A3]/10 bg-[#E6FAF5]" style={{ background: `conic-gradient(#2950A3 0 ${userCounts.percentA}%, #D8E280 ${userCounts.percentA}% 100%)` }}>
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white/90 text-center text-xl font-semibold text-[#382F52] shadow-sm">
                        {userCounts.percentA}% / {userCounts.percentB}%
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:w-[55%]">
                    <div className="rounded-[20px] border border-[#2950A3]/10 bg-white p-5">
                      <p className="text-sm font-semibold text-[#382F52]">User A</p>
                      <p className="mt-3 text-3xl font-semibold text-[#2950A3]">{userCounts.percentA}%</p>
                      <p className="mt-2 text-sm text-slate-600">{userCounts.counts.A} tareas asignadas</p>
                    </div>
                    <div className="rounded-[20px] border border-[#D8E280]/20 bg-white p-5">
                      <p className="text-sm font-semibold text-[#382F52]">User B</p>
                      <p className="mt-3 text-3xl font-semibold text-[#D8E280]">{userCounts.percentB}%</p>
                      <p className="mt-2 text-sm text-slate-600">{userCounts.counts.B} tareas asignadas</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-[20px] border border-[#2950A3]/10 bg-[#F5FCFA] p-5">
                  <p className="text-sm font-semibold text-[#382F52]">Meta</p>
                  <p className="mt-2 text-sm text-slate-600">Se busca un reparto calmado alrededor de 65/35 para que ambos usuarios tengan equilibrio.</p>
                </div>
              </div>
            )}

            {currentView === "profile" && (
              <div className="rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2950A3]">Perfil</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#382F52]">Usuarios del hogar</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar name="User A" />
                    <Avatar name="User B" />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {USERS.map((user) => (
                    <div key={user} className="rounded-[20px] border border-[#2950A3]/10 bg-[#F5FCFA] p-5 shadow-sm">
                      <p className="text-lg font-semibold text-[#382F52]">{USER_LABELS[user]}</p>
                      <p className="mt-2 text-sm text-slate-600">Carga de tareas: {userCounts.counts[user]} tareas.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2950A3]">Hoy</p>
                  <h2 className="mt-2 text-xl font-semibold text-[#382F52]">Resumen rápido</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentView("home")}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#2950A3] shadow-sm border border-[#2950A3]/20"
                >
                  <ArrowRight className="h-4 w-4" /> Volver
                </button>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-[20px] bg-[#E6FAF5] p-4">
                  <p className="text-sm font-semibold text-[#382F52]">Tareas diarias</p>
                  <p className="mt-2 text-3xl font-semibold text-[#2950A3]">{todayTasks.length}</p>
                </div>
                <div className="rounded-[20px] bg-[#E6FAF5] p-4">
                  <p className="text-sm font-semibold text-[#382F52]">Tareas sin fecha</p>
                  <p className="mt-2 text-3xl font-semibold text-[#D8E280]">{unscheduledTasks.length}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setResetConfirmOpen(true)}
                    className="flex-1 rounded-2xl border border-[#2950A3]/20 bg-white px-4 py-3 text-sm font-semibold text-[#2950A3] transition hover:bg-[#2950A3]/5"
                  >
                    Reset Daily Tasks
                  </button>
                  <button
                    type="button"
                    onClick={addTask}
                    className="flex-1 rounded-2xl bg-[#2950A3] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f3f7b]"
                  >
                    Add New Task
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-white/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(45,70,100,0.08)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-3xl bg-[#2950A3] p-3 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#382F52]">Consejo</p>
                  <p className="mt-2 text-sm text-slate-600">Las tareas sin fecha te ayudan a mantener el flujo sin la presión de una fecha exacta.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,780px)] -translate-x-1/2 rounded-[24px] border border-white/80 bg-white/90 p-3 shadow-[0_30px_80px_rgba(45,70,100,0.12)] backdrop-blur-xl">
        <div className="grid grid-cols-4 gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-3xl px-2 py-3 text-sm font-semibold transition ${active ? "bg-[#2950A3] text-white" : "text-[#382F52] hover:bg-[#E6FAF5]"}`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <AlertDialog open={resetConfirmOpen} onOpenChange={setResetConfirmOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogTitle>Restablecer tareas diarias</AlertDialogTitle>
            <AlertDialogDescription>Esto marcará todas las tareas diarias como pendientes nuevamente.</AlertDialogDescription>
            <div className="mt-6 flex justify-end gap-3">
              <AlertDialogCancel className="rounded-2xl border border-[#2950A3]/20 bg-white px-4 py-2 text-sm font-semibold text-[#2950A3]">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-2xl bg-[#2950A3] px-4 py-2 text-sm font-semibold text-white"
                onClick={resetDailyTasks}
              >
                Confirmar
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogTitle>Eliminar tarea</AlertDialogTitle>
            <AlertDialogDescription>¿Seguro que quieres eliminar esta tarea permanentemente?</AlertDialogDescription>
            <div className="mt-6 flex justify-end gap-3">
              <AlertDialogCancel className="rounded-2xl border border-[#2950A3]/20 bg-white px-4 py-2 text-sm font-semibold text-[#2950A3]">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-2xl bg-[#D8E280] px-4 py-2 text-sm font-semibold text-[#382F52]"
                onClick={removeTask}
              >
                Eliminar
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  );
}
