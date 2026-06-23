import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import type { Task, TaskStatusFilter } from "@/constants/types";

const FILTERS: { label: string; value: TaskStatusFilter }[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Not Completed",
    value: "not-completed",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

type TaskListHeaderProps = {
  tasks: Task[];
  searchQuery: string;
  selectedFilter: TaskStatusFilter;
  visibleTaskCount: number;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: TaskStatusFilter) => void;
};

export const TaskListHeader = ({
  tasks,
  searchQuery,
  selectedFilter,
  visibleTaskCount,
  onSearchChange,
  onFilterChange,
}: TaskListHeaderProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const handleFilterPress = (filter: TaskStatusFilter) => {
    onFilterChange(filter);
  };

  return (
    <View style={styles.header}>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.title}>TaskList</Text>
          <Text style={styles.subtitle}>
            A clean place to plan, track, and finish the work ahead.
          </Text>
        </View>

        <Image
          accessibilityIgnoresInvertColors
          resizeMode="contain"
          source={require("@/assets/images/tasks-dashboard-illustration.png")}
          style={styles.heroImage}
        />
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalTasks}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{activeTasks}</Text>
          <Text style={styles.summaryLabel}>Not Completed</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{completedTasks}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.searchBox}>
          <Ionicons color="#64748B" name="search" size={19} />
          <TextInput
            accessibilityLabel="Search tasks by title"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onSearchChange}
            placeholder="Search tasks by title"
            placeholderTextColor="#64748B"
            returnKeyType="search"
            style={styles.searchInput}
            value={searchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          {FILTERS.map((filter) => {
            const isSelected = filter.value === selectedFilter;

            return (
              <TouchableOpacity
                accessibilityLabel={`Filter tasks by ${filter.label}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                activeOpacity={0.8}
                key={filter.value}
                onPress={() => {
                  handleFilterPress(filter.value);
                }}
                style={[
                  styles.filterChip,
                  isSelected ? styles.filterChipActive : null,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected ? styles.filterChipTextActive : null,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Task List</Text>
          <Text style={styles.sectionSubtitle}>Tap a task to see details.</Text>
        </View>
        <Text style={styles.sectionCount}>
          {visibleTaskCount} {visibleTaskCount === 1 ? "task" : "tasks"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 8,
  },
  hero: {
    marginHorizontal: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderRadius: 28,
    backgroundColor: "#EAF4FF",
  },
  heroCopy: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 2,
    color: "#4B5563",
    fontSize: 15,
  },
  heroImage: {
    width: "100%",
    height: 190,
    alignSelf: "center",
    marginTop: 6,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "700",
  },
  summaryLabel: {
    marginTop: 3,
    color: "#6B7280",
    fontSize: 11.5,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#E5E7EB",
  },
  controls: {
    marginHorizontal: 20,
    marginTop: 14,
  },
  searchBox: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    flex: 1,
    minHeight: 52,
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
    paddingVertical: 0,
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  filterChip: {
    minHeight: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  filterChipActive: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  filterChipText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#2563EB",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSubtitle: {
    marginTop: 1,
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionCount: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "700",
  },
});
