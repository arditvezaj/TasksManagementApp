import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AddTaskFormProps = {
  title: string;
  description: string;
  completed: boolean;
  errors: {
    title?: string;
    description?: string;
  };
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (completed: boolean) => void;
  onSubmit: () => void;
};

export const AddTaskForm = ({
  title,
  description,
  completed,
  errors,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onSubmit,
}: AddTaskFormProps) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.intro}>
        <View style={styles.introIcon}>
          <Ionicons color="#2563EB" name="create-outline" size={28} />
        </View>
        <Text style={styles.title}>Create a new task</Text>
        <Text style={styles.description}>
          Give the next priority a clear title.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            onChangeText={onTitleChange}
            placeholder="Enter task title"
            placeholderTextColor="#94A3B8"
            returnKeyType="next"
            style={[styles.input, errors.title ? styles.inputError : null]}
            value={title}
          />
          {errors.title ? (
            <Text style={styles.errorText}>{errors.title}</Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline
            onChangeText={onDescriptionChange}
            placeholder="Short task description"
            placeholderTextColor="#94A3B8"
            style={[
              styles.input,
              styles.textArea,
              errors.description ? styles.inputError : null,
            ]}
            textAlignVertical="top"
            value={description}
          />
          {errors.description ? (
            <Text style={styles.errorText}>{errors.description}</Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusSelector}>
            <TouchableOpacity
              accessibilityLabel="Set task as not completed"
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() => {
                onStatusChange(false);
              }}
              style={[
                styles.statusOption,
                !completed ? styles.statusOptionActive : null,
              ]}
            >
              <Ionicons
                color={!completed ? "#2563EB" : "#64748B"}
                name="ellipse-outline"
                size={18}
              />
              <Text
                style={[
                  styles.statusOptionText,
                  !completed ? styles.statusOptionTextActive : null,
                ]}
              >
                Not completed
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityLabel="Set task as completed"
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() => {
                onStatusChange(true);
              }}
              style={[
                styles.statusOption,
                completed ? styles.statusOptionActive : null,
              ]}
            >
              <Ionicons
                color={completed ? "#2563EB" : "#64748B"}
                name="checkmark-circle-outline"
                size={18}
              />
              <Text
                style={[
                  styles.statusOptionText,
                  completed ? styles.statusOptionTextActive : null,
                ]}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        accessibilityLabel="Add new task"
        accessibilityRole="button"
        activeOpacity={0.86}
        onPress={onSubmit}
        style={styles.primaryButton}
      >
        <Ionicons color="#FFFFFF" name="add-circle-outline" size={22} />
        <Text style={styles.primaryButtonText}>Add Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 38,
  },
  intro: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 22,
  },
  introIcon: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "#EFF6FF",
  },
  title: {
    marginTop: 14,
    color: "#111827",
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  form: {
    gap: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.07,
    shadowRadius: 22,
    elevation: 3,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    color: "#111827",
    fontSize: 15,
    fontWeight: "600",
  },
  textArea: {
    minHeight: 116,
    paddingTop: 14,
    lineHeight: 21,
  },
  inputError: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FFF7F7",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "600",
  },
  statusSelector: {
    flexDirection: "row",
    gap: 10,
  },
  statusOption: {
    minHeight: 48,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
  },
  statusOptionActive: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  statusOptionText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },
  statusOptionTextActive: {
    color: "#2563EB",
  },
  primaryButton: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
