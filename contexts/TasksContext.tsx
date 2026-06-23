import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { SAMPLE_TASKS } from "@/constants/tasks";
import type { Task } from "@/constants/types";

const TASKS_STORAGE_KEY = "@pritech_task_manager/tasks";
const PUBLIC_TODOS_URL = "https://jsonplaceholder.typicode.com/todos?_limit=4";
const STARTER_TASKS_TIMEOUT_MS = 8000;

type PublicTodo = {
  id: number;
  title: string;
  completed: boolean;
};

type CreateTaskInput = {
  title: string;
  description: string;
  completed: boolean;
};

type TasksContextValue = {
  tasks: Task[];
  isLoading: boolean;
  addTask: (input: CreateTaskInput) => Task;
  deleteTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

const isTask = (value: unknown): value is Task => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const task = value as Task;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    typeof task.completed === "boolean" &&
    typeof task.createdAt === "string"
  );
};

const isPublicTodo = (value: unknown): value is PublicTodo => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const todo = value as PublicTodo;

  return (
    typeof todo.id === "number" &&
    typeof todo.title === "string" &&
    typeof todo.completed === "boolean"
  );
};

const createTaskId = () => {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const toSentenceCase = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Untitled task";
  }

  return `${trimmedValue.charAt(0).toUpperCase()}${trimmedValue.slice(1)}`;
};

const parseStoredTasks = (storedTasks: string | null) => {
  if (!storedTasks) {
    return null;
  }

  const parsedTasks = JSON.parse(storedTasks) as unknown;

  if (!Array.isArray(parsedTasks)) {
    return null;
  }

  if (parsedTasks.every(isTask)) {
    return parsedTasks;
  }

  const validTasks = parsedTasks.filter(isTask);

  return validTasks.length > 0 ? validTasks : null;
};

const fetchStarterTasks = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, STARTER_TASKS_TIMEOUT_MS);

  try {
    const response = await fetch(PUBLIC_TODOS_URL, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Could not fetch starter tasks");
    }

    const payload = (await response.json()) as unknown;

    if (!Array.isArray(payload)) {
      throw new Error("Starter tasks response was invalid");
    }

    const todos = payload.filter(isPublicTodo);
    const now = Date.now();

    if (todos.length === 0) {
      throw new Error("Starter tasks response was empty");
    }

    return todos.map((todo, index) => {
      return {
        id: `api-${todo.id}`,
        title: toSentenceCase(todo.title),
        description: `Starter task imported from the JSONPlaceholder public API. Todo #${todo.id}.`,
        completed: todo.completed,
        createdAt: new Date(now - index * 86400000).toISOString(),
      };
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

const getInitialTasks = async () => {
  try {
    const storedTasks = await SecureStore.getItemAsync(TASKS_STORAGE_KEY);
    const parsedTasks = parseStoredTasks(storedTasks);

    if (parsedTasks !== null) {
      return parsedTasks;
    }

    return await fetchStarterTasks();
  } catch {
    return SAMPLE_TASKS;
  }
};

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      const initialTasks = await getInitialTasks();

      if (!isMounted) {
        return;
      }

      setTasks(initialTasks);
      setHasLoaded(true);
      setIsLoading(false);
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    SecureStore.setItemAsync(TASKS_STORAGE_KEY, JSON.stringify(tasks)).catch(
      () => undefined,
    );
  }, [hasLoaded, tasks]);

  const addTask = useCallback((input: CreateTaskInput) => {
    const task: Task = {
      id: createTaskId(),
      title: input.title.trim(),
      description: input.description.trim(),
      completed: input.completed,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => {
      return [task, ...currentTasks];
    });

    return task;
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
  }, []);

  const toggleTaskStatus = useCallback((taskId: string) => {
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          completed: !task.completed,
        };
      });
    });
  }, []);

  const value = useMemo<TasksContextValue>(() => {
    return {
      tasks,
      isLoading,
      addTask,
      deleteTask,
      toggleTaskStatus,
    };
  }, [addTask, deleteTask, isLoading, tasks, toggleTaskStatus]);

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used inside TasksProvider");
  }

  return context;
};
