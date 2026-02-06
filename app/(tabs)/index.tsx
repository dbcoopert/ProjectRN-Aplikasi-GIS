import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import TaskItem from "../../src/components/TaskItem";

interface Task {
  id: string;
  text: string;
}

export default function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // CREATE atau UPDATE
  const handleSaveTask = () => {
    if (task.trim() === "") return;

    if (editingId) {
      // Logic Update
      setTaskList(
        taskList.map((t) => (t.id === editingId ? { ...t, text: task } : t)),
      );
      setEditingId(null);
    } else {
      // Logic Create
      const newTask = { id: Date.now().toString(), text: task };
      setTaskList([...taskList, newTask]);
    }
    setTask("");
  };

  // DELETE
  const deleteTask = (id: string) => {
    setTaskList(taskList.filter((t) => t.id !== id));
  };

  // Persiapan EDIT
  const startEdit = (item: Task) => {
    setTask(item.text);
    setEditingId(item.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Task Manager React Native</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Ketik tugas baru..."
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity
            style={[
              styles.saveBtn,
              { backgroundColor: editingId ? "#f59e0b" : "#10b981" },
            ]}
            onPress={handleSaveTask}
          >
            <Text style={styles.saveBtnText}>
              {editingId ? "Update" : "Tambah"}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onDelete={deleteTask} onEdit={startEdit} />
          )}
          ListEmptyComponent={<Text style={styles.empty}>Belum ada data.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20, maxWidth: 600, alignSelf: "center", width: "100%" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e293b",
    textAlign: "center",
  },
  inputGroup: { flexDirection: "row", gap: 10, marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  saveBtn: { paddingHorizontal: 20, justifyContent: "center", borderRadius: 8 },
  saveBtnText: { color: "white", fontWeight: "bold" },
  empty: { textAlign: "center", color: "#94a3b8", marginTop: 20 },
});
