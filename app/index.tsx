import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import type { ListRenderItem } from "react-native";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TaskEmptyState } from "@/components/molecules/TaskEmptyState";
import { TaskListItem } from "@/components/molecules/TaskListItem";
import { TaskListHeader } from "@/components/organisms/TaskListHeader";
import { SAMPLE_TASKS } from "@/constants/tasks";
import type { Task, TaskStatusFilter } from "@/constants/types";

const getFilteredTasks = (
  tasks: Task[],
  filter: TaskStatusFilter,
  query: string,
) => {
  const normalizedQuery = query.trim().toLowerCase();
  const statusFilteredTasks = tasks.filter((task) => {
    if (filter === "not-completed") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  if (!normalizedQuery) {
    return statusFilteredTasks;
  }

  return statusFilteredTasks.filter((task) => {
    return task.title.toLowerCase().includes(normalizedQuery);
  });
};

const getEmptyStateContent = (filter: TaskStatusFilter, query: string) => {
  const normalizedQuery = query.trim();

  if (normalizedQuery) {
    return {
      title: "No matching tasks",
      description: `No task title matches "${normalizedQuery}". Try a different search.`,
    };
  }

  if (filter === "not-completed") {
    return {
      title: "No active tasks",
      description:
        "Completed work is out of the way. Add a task when something new appears.",
    };
  }

  if (filter === "completed") {
    return {
      title: "No completed tasks",
      description:
        "Finished tasks will show up here once you mark them complete.",
    };
  }

  return {
    title: "No tasks yet",
    description: "Start with one clear next step and keep your day moving.",
  };
};

const TaskListScreen = () => {
  const router = useRouter();
  const tasks = SAMPLE_TASKS;
  const [selectedFilter, setSelectedFilter] = useState<TaskStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTasks = useMemo(() => {
    return getFilteredTasks(tasks, selectedFilter, searchQuery);
  }, [searchQuery, selectedFilter, tasks]);
  const emptyStateContent = getEmptyStateContent(selectedFilter, searchQuery);

  const handleAddTask = () => router.push("/add-task");

  const handleFilterChange = (filter: TaskStatusFilter) =>
    setSelectedFilter(filter);

  const handleSearchChange = (query: string) => setSearchQuery(query);

  const handleOpenTask = (task: Task) =>
    router.push({
      pathname: "/task/[id]",
      params: {
        id: task.id,
      },
    });

  const renderTask: ListRenderItem<Task> = ({ item }) => (
    <TaskListItem onPress={handleOpenTask} task={item} />
  );

  const renderEmptyState = () => (
    <TaskEmptyState
      description={emptyStateContent.description}
      onCreateTask={handleAddTask}
      title={emptyStateContent.title}
    />
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <FlatList
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={
          <TaskListHeader
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            selectedFilter={selectedFilter}
            tasks={tasks}
            visibleTaskCount={filteredTasks.length}
          />
        }
        contentContainerStyle={styles.listContent}
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        accessibilityLabel="Create task"
        accessibilityRole="button"
        activeOpacity={0.86}
        onPress={handleAddTask}
        style={styles.floatingButton}
      >
        <Ionicons color="#FFFFFF" name="add" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 110,
  },
  floatingButton: {
    position: "absolute",
    right: 22,
    bottom: 28,
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
});
