import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DeleteTaskModalProps = {
  visible: boolean;
  taskTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteTaskModal = ({
  visible,
  taskTitle,
  onCancel,
  onConfirm,
}: DeleteTaskModalProps) => {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onCancel}
      transparent
      visible={visible}
    >
      <View style={styles.modalRoot}>
        <Pressable
          accessibilityLabel="Close delete confirmation"
          accessibilityRole="button"
          onPress={onCancel}
          style={styles.modalBackdrop}
        />

        <View style={styles.modalCard}>
          <View style={styles.modalIconWrap}>
            <Ionicons color="#DC2626" name="trash-outline" size={30} />
          </View>

          <Text style={styles.modalTitle}>Delete this task?</Text>
          <Text style={styles.modalDescription}>
            Are you sure you want to delete {taskTitle}? This action cannot be
            undone.
          </Text>

          <View style={styles.modalActions}>
            <TouchableOpacity
              accessibilityLabel="Cancel delete task"
              accessibilityRole="button"
              activeOpacity={0.84}
              onPress={onCancel}
              style={styles.modalCancelButton}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityLabel="Confirm delete task"
              accessibilityRole="button"
              activeOpacity={0.84}
              onPress={onConfirm}
              style={styles.modalDeleteButton}
            >
              <Ionicons color="#FFFFFF" name="trash-outline" size={18} />
              <Text style={styles.modalDeleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteTaskModal;

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.52)",
  },
  modalCard: {
    width: "100%",
    maxWidth: 390,
    alignItems: "center",
    padding: 22,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 10,
  },
  modalIconWrap: {
    width: 66,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "#FEF2F2",
  },
  modalTitle: {
    marginTop: 16,
    color: "#111827",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  modalDescription: {
    marginTop: 9,
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  modalActions: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  modalCancelButton: {
    minHeight: 52,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 17,
    backgroundColor: "#F8FAFC",
  },
  modalCancelText: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "700",
  },
  modalDeleteButton: {
    minHeight: 52,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 17,
    backgroundColor: "#DC2626",
  },
  modalDeleteText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
