import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/atoms/BackButton";
import { AddTaskForm } from "@/components/organisms/AddTaskForm";

const AddTaskScreen = () => {
  const router = useRouter();

  const handleBack = () => router.back();

  const handleSubmit = () => {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />

        <Text style={styles.headerTitle}>New Task</Text>

        <View style={styles.headerSpacer} />
      </View>

      <AddTaskForm onSubmit={handleSubmit} />
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
