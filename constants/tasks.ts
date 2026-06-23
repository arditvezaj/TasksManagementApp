import type { Task } from "@/constants/types";

export const SAMPLE_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Review project plan",
    description: "Check priorities, remove stale items, and pick the next clear step.",
    completed: false,
    createdAt: "2026-06-23T08:30:00.000Z",
  },
  {
    id: "task-2",
    title: "Design task list screen",
    description: "Create the list, empty state, search bar, and status filters.",
    completed: true,
    createdAt: "2026-06-22T14:15:00.000Z",
  },
  {
    id: "task-3",
    title: "Prepare sprint notes",
    description: "Write a short update for completed work and open blockers.",
    completed: false,
    createdAt: "2026-06-21T11:00:00.000Z",
  },
  {
    id: "task-4",
    title: "Clean up backlog",
    description: "Delete duplicate tasks and group the remaining items by status.",
    completed: true,
    createdAt: "2026-06-19T16:45:00.000Z",
  },
];
