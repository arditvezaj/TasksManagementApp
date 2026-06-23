import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

export type TaskDetailIconName = ComponentProps<typeof Ionicons>["name"];

type TaskDetailRowProps = {
  icon: TaskDetailIconName;
  label: string;
  value: string;
  accentColor: string;
};

export const TaskDetailRow = ({
  icon,
  label,
  value,
  accentColor,
}: TaskDetailRowProps) => {
  return (
    <View style={styles.detailRow}>
      <View
        style={[styles.detailIcon, { backgroundColor: `${accentColor}18` }]}
      >
        <Ionicons color={accentColor} name={icon} size={20} />
      </View>

      <View style={styles.detailCopy}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text numberOfLines={2} style={styles.detailValue}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailRow: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  detailIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  detailCopy: {
    flex: 1,
  },
  detailLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  detailValue: {
    marginTop: 3,
    color: "#111827",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 21,
  },
});
