import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/atoms/BackButton";
import { AddTaskForm } from "@/components/organisms/AddTaskForm";
import { useTasks } from "@/contexts/TasksContext";

type AddTaskErrors = {
  title?: string;
  description?: string;
};

const getValidationErrors = (title: string, description: string) => {
  const errors: AddTaskErrors = {};

  if (!title.trim()) {
    errors.title = "Task title is required.";
  }

  if (!description.trim()) {
    errors.description = "Task description is required.";
  }

  return errors;
};

const AddTaskScreen = () => {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState<AddTaskErrors>({});

  const handleBack = () => router.back();

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setErrors((currentErrors) => {
      return {
        ...currentErrors,
        title: undefined,
      };
    });
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setErrors((currentErrors) => {
      return {
        ...currentErrors,
        description: undefined,
      };
    });
  };

  const handleStatusChange = (nextCompleted: boolean) => {
    setCompleted(nextCompleted);
  };

  const handleSubmit = () => {
    const validationErrors = getValidationErrors(title, description);

    if (validationErrors.title || validationErrors.description) {
      setErrors(validationErrors);
      return;
    }

    addTask({
      title,
      description,
      completed,
    });

    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />

        <Text style={styles.headerTitle}>New Task</Text>

        <View style={styles.headerSpacer} />
      </View>

      <AddTaskForm
        completed={completed}
        description={description}
        errors={errors}
        onDescriptionChange={handleDescriptionChange}
        onStatusChange={handleStatusChange}
        onSubmit={handleSubmit}
        onTitleChange={handleTitleChange}
        title={title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  headerTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 44,
    height: 44,
  },
});

export default AddTaskScreen;
