import { StyleSheet, Text, View } from "react-native";

import {
  TaskDetailRow,
  type TaskDetailIconName,
} from "@/components/molecules/TaskDetailRow";

type TaskDetailsInfoProps = {
  statusIcon: TaskDetailIconName;
  statusColor: string;
  statusLabel: string;
  createdDateLabel: string;
  createdTimeLabel: string;
  taskId: string;
};

export const TaskDetailsInfo = ({
  statusIcon,
  statusColor,
  statusLabel,
  createdDateLabel,
  createdTimeLabel,
  taskId,
}: TaskDetailsInfoProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Details</Text>
      <Text style={styles.sectionDescription}>
        Status and creation metadata for this task.
      </Text>
      <View style={styles.detailsList}>
        <TaskDetailRow
          accentColor={statusColor}
          icon={statusIcon}
          label="Status"
          value={statusLabel}
        />
        <View style={styles.rowDivider} />
        <TaskDetailRow
          accentColor="#0F766E"
          icon="calendar-clear-outline"
          label="Created date"
          value={createdDateLabel}
        />
        <View style={styles.rowDivider} />
        <TaskDetailRow
          accentColor="#2563EB"
          icon="time-outline"
          label="Created time"
          value={createdTimeLabel}
        />
        <View style={styles.rowDivider} />
        <TaskDetailRow
          accentColor="#475569"
          icon="pricetag-outline"
          label="Task ID"
          value={taskId}
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
    marginTop: 5,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
  detailsList: {
    marginTop: 14,
  },
  rowDivider: {
    height: 1,
    marginLeft: 54,
    backgroundColor: "#E2E8F0",
  },
});
