import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];

type TaskDetailsHeroProps = {
  title: string;
  description: string;
  statusLabel: string;
  statusIcon: IconName;
  statusColor: string;
  statusBackground: string;
};

export const TaskDetailsHero = ({
  title,
  description,
  statusLabel,
  statusIcon,
  statusColor,
  statusBackground,
}: TaskDetailsHeroProps) => {
  return (
    <View style={styles.heroCard}>
      <View style={styles.heroTopRow}>
        <View
          style={[styles.statusBadge, { backgroundColor: statusBackground }]}
        >
          <Ionicons color={statusColor} name={statusIcon} size={18} />
          <Text style={[styles.statusBadgeText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.07,
    shadowRadius: 22,
    elevation: 4,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  title: {
    marginTop: 18,
    color: "#111827",
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 34,
  },
  description: {
    marginTop: 12,
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
  },
});
