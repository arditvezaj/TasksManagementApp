import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { Task } from "@/constants/types";

type TaskListItemProps = {
  task: Task;
  onPress: (task: Task) => void;
};

const getTaskDateLabel = (createdAt: string) => {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "No date";
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
};

export const TaskListItem = ({ task, onPress }: TaskListItemProps) => {
  const isCompleted = task.completed;

  const handlePress = () => {
    onPress(task);
  };

  const handleToggleStatus = () => {};

  const handleDelete = () => {};

  return (
    <TouchableOpacity
      accessibilityLabel={`Open task ${task.title}`}
      accessibilityRole="button"
      activeOpacity={0.82}
      onPress={handlePress}
      style={[styles.card, isCompleted ? styles.cardCompleted : null]}
    >
      <View
        style={[
          styles.statusRail,
          isCompleted ? styles.statusRailCompleted : styles.statusRailActive,
        ]}
      />

      <View style={styles.leadingColumn}>
        <TouchableOpacity
          accessibilityLabel={
            isCompleted
              ? "Mark task as not completed"
              : "Mark task as completed"
          }
          accessibilityRole="button"
          activeOpacity={0.78}
          onPress={handleToggleStatus}
          style={[
            styles.checkbox,
            isCompleted ? styles.checkboxCompleted : styles.checkboxOpen,
          ]}
        >
          {isCompleted ? (
            <Ionicons color="#FFFFFF" name="checkmark" size={17} />
          ) : null}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleCopy}>
            <Text
              numberOfLines={1}
              style={[styles.title, isCompleted ? styles.titleCompleted : null]}
            >
              {task.title}
            </Text>
            <Text style={styles.dateCaption}>
              {getTaskDateLabel(task.createdAt)}
            </Text>
          </View>

          <TouchableOpacity
            accessibilityLabel={`Delete ${task.title}`}
            accessibilityRole="button"
            activeOpacity={0.78}
            onPress={handleDelete}
            style={styles.deleteButton}
          >
            <Ionicons color="#DC2626" name="trash-outline" size={18} />
          </TouchableOpacity>
        </View>

        <Text
          numberOfLines={2}
          style={[
            styles.description,
            isCompleted ? styles.descriptionCompleted : null,
          ]}
        >
          {task.description}
        </Text>

        <View style={styles.metaRow}>
          <View
            style={[
              styles.statePill,
              isCompleted ? styles.completedPill : styles.activePill,
            ]}
          >
            <Ionicons
              color={isCompleted ? "#0F766E" : "#B45309"}
              name={isCompleted ? "checkmark-circle" : "ellipse-outline"}
              size={14}
            />
            <Text
              style={[
                styles.stateText,
                isCompleted ? styles.completedText : styles.activeText,
              ]}
            >
              {isCompleted ? "Completed" : "Not completed"}
            </Text>
          </View>

          <View style={styles.openHint}>
            <Text style={styles.openHintText}>Details</Text>
            <Ionicons color="#64748B" name="chevron-forward" size={16} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  cardCompleted: {
    backgroundColor: "#FCFEFF",
  },
  statusRail: {
    position: "absolute",
    left: 0,
    top: 16,
    bottom: 16,
    width: 4,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  },
  statusRailActive: {
    backgroundColor: "#F59E0B",
  },
  statusRailCompleted: {
    backgroundColor: "#14B8A6",
  },
  leadingColumn: {
    alignItems: "center",
    width: 36,
    marginRight: 10,
    paddingTop: 2,
  },
  checkbox: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  checkboxCompleted: {
    backgroundColor: "#14B8A6",
  },
  checkboxOpen: {
    borderWidth: 2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  titleCopy: {
    flex: 1,
  },
  title: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  titleCompleted: {
    color: "#475569",
  },
  dateCaption: {
    marginTop: 3,
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 14,
    backgroundColor: "#FEF2F2",
  },
  description: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 21,
  },
  descriptionCompleted: {
    color: "#94A3B8",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 10,
  },
  statePill: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  activePill: {
    backgroundColor: "#FEF3C7",
  },
  completedPill: {
    backgroundColor: "#CCFBF1",
  },
  stateText: {
    fontSize: 12,
    fontWeight: "600",
  },
  activeText: {
    color: "#B45309",
  },
  completedText: {
    color: "#0F766E",
  },
  openHint: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingLeft: 8,
  },
  openHintText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
});
