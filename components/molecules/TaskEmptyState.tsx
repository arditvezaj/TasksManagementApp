import { Image, StyleSheet, Text, View } from "react-native";

type TaskEmptyStateProps = {
  onCreateTask: () => void;
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export const TaskEmptyState = ({
  title = "No tasks yet",
  description = "Start with one clear next step and keep your day moving.",
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
});
