import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type TaskActionIconName = ComponentProps<typeof Ionicons>["name"];

type TaskActionButtonProps = {
  icon: TaskActionIconName;
  label: string;
  tone: "primary" | "danger";
  onPress: () => void;
};

export const TaskActionButton = ({
  icon,
  label,
  tone,
  onPress,
}: TaskActionButtonProps) => {
  const isDanger = tone === "danger";

  return (
    <TouchableOpacity
      accessibilityLabel={label}
      accessibilityRole="button"
      activeOpacity={0.84}
      onPress={onPress}
      style={[
        styles.actionButton,
        isDanger ? styles.dangerButton : styles.primaryButton,
      ]}
    >
      <Ionicons
        color={isDanger ? "#DC2626" : "#FFFFFF"}
        name={icon}
        size={21}
      />
      <Text
        style={[
          styles.actionButtonText,
          isDanger ? styles.dangerButtonText : null,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 18,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
  },
  dangerButtonText: {
    color: "#DC2626",
  },
});
