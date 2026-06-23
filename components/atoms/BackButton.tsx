import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

type BackButtonProps = {
  onPress: () => void;
};

export const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <TouchableOpacity
      accessibilityLabel="Go back"
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.button}
    >
      <Ionicons color="#111827" name="chevron-back" size={22} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
});
