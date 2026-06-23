import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, type ComponentProps } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/atoms/BackButton";
import { DeleteTaskModal } from "@/components/organisms/DeleteTaskModal";
import { TaskDetailsActions } from "@/components/organisms/TaskDetailsActions";
import { TaskDetailsHero } from "@/components/organisms/TaskDetailsHero";
import { TaskDetailsInfo } from "@/components/organisms/TaskDetailsInfo";
import { SAMPLE_TASKS } from "@/constants/tasks";
import type { Task } from "@/constants/types";

type IconName = ComponentProps<typeof Ionicons>["name"];

const getTaskDateLabel = (createdAt: string) => {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "No date";
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getTaskTimeLabel = (createdAt: string) => {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "No time";
  }

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTaskStatusLabel = (task: Task) => {
  return task.completed ? "Completed" : "Not completed";
};

const TaskDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const task = SAMPLE_TASKS.find((item) => item.id === id) ?? SAMPLE_TASKS[0];
  const statusLabel = getTaskStatusLabel(task);
  const statusIcon: IconName = task.completed
    ? "checkmark-done"
    : "ellipse-outline";
  const statusColor = task.completed ? "#0F766E" : "#B45309";
  const statusBackground = task.completed ? "#CCFBF1" : "#FEF3C7";
  const toggleLabel = task.completed
    ? "Mark as Not Completed"
    : "Mark as Completed";
  const toggleIcon: IconName = task.completed
    ? "ellipse-outline"
    : "checkmark-circle-outline";
  const createdDateLabel = getTaskDateLabel(task.createdAt);
  const createdTimeLabel = getTaskTimeLabel(task.createdAt);

  const handleBack = () => router.back();

  const handleToggleStatus = () => {};

  const toggleDeleteModal = () =>
    setIsDeleteModalVisible((prevState) => !prevState);

  const handleConfirmDelete = () => setIsDeleteModalVisible(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />

        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Task Details</Text>
        </View>

        <TouchableOpacity
          accessibilityLabel="Delete task"
          accessibilityRole="button"
          activeOpacity={0.8}
          onPress={toggleDeleteModal}
          style={styles.headerDeleteButton}
        >
          <Ionicons color="#DC2626" name="trash-outline" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TaskDetailsHero
          description={task.description}
          statusBackground={statusBackground}
          statusColor={statusColor}
          statusIcon={statusIcon}
          statusLabel={statusLabel}
          title={task.title}
        />

        <TaskDetailsInfo
          createdDateLabel={createdDateLabel}
          createdTimeLabel={createdTimeLabel}
          statusColor={statusColor}
          statusIcon={statusIcon}
          statusLabel={statusLabel}
          taskId={task.id}
        />

        <TaskDetailsActions
          onDeleteTask={toggleDeleteModal}
          onToggleStatus={handleToggleStatus}
          toggleIcon={toggleIcon}
          toggleLabel={toggleLabel}
        />
      </ScrollView>

      <DeleteTaskModal
        onCancel={toggleDeleteModal}
        onConfirm={handleConfirmDelete}
        taskTitle={task.title}
        visible={isDeleteModalVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerCopy: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 14,
  },
  headerTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  headerDeleteButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 38,
  },
});

export default TaskDetailsScreen;
