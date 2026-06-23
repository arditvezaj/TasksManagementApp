import { StyleSheet, Text, View } from "react-native";

import {
  TaskActionButton,
  type TaskActionIconName,
} from "@/components/atoms/TaskActionButton";

type TaskDetailsActionsProps = {
  toggleIcon: TaskActionIconName;
  toggleLabel: string;
  onToggleStatus: () => void;
  onDeleteTask: () => void;
};

export const TaskDetailsActions = ({
  toggleIcon,
  toggleLabel,
  onToggleStatus,
  onDeleteTask,
}: TaskDetailsActionsProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Actions</Text>
      <Text style={styles.sectionDescription}>
        Update the task status or remove this task from your list.
      </Text>

      <View style={styles.actions}>
        <TaskActionButton
          icon={toggleIcon}
          label={toggleLabel}
          onPress={onToggleStatus}
          tone="primary"
        />
        <TaskActionButton
          icon="trash-outline"
          label="Delete Task"
          onPress={onDeleteTask}
          tone="danger"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionDescription: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    gap: 12,
    marginTop: 16,
  },
});
