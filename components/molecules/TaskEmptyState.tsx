import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TaskEmptyStateProps = {
  onCreateTask: () => void;
  title?: string;
  description?: string;
  buttonLabel?: string;
  showAction?: boolean;
};

export const TaskEmptyState = ({
  onCreateTask,
  title = "No tasks yet",
  description = "Start with one clear next step and keep your day moving.",
  buttonLabel = "New Task",
  showAction = true,
}: TaskEmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={require("@/assets/images/tasks-empty-state.png")}
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {showAction ? (
        <TouchableOpacity
          accessibilityLabel={buttonLabel}
          accessibilityRole="button"
          activeOpacity={0.84}
          onPress={onCreateTask}
          style={styles.button}
        >
          <Ionicons color="#FFFFFF" name="add-circle-outline" size={20} />
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 18,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  image: {
    width: 200,
    height: 140,
    marginBottom: 10,
  },
  title: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    maxWidth: 260,
    marginTop: 8,
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  button: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: "#2563EB",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
