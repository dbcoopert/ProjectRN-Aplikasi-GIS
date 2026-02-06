import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  task: { id: string; text: string };
  onDelete: (id: string) => void;
  onEdit: (task: { id: string; text: string }) => void;
}

export default function TaskItem({ task, onDelete, onEdit }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{task.text}</Text>
      <View style={styles.actionGroup}>
        <TouchableOpacity onPress={() => onEdit(task)} style={styles.editBtn}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          style={styles.deleteBtn}
        >
          <Text style={styles.btnText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 2,
  },
  text: { fontSize: 16, flex: 1 },
  actionGroup: { flexDirection: "row", gap: 10 },
  editBtn: { backgroundColor: "#3b82f6", padding: 8, borderRadius: 5 },
  deleteBtn: { backgroundColor: "#ef4444", padding: 8, borderRadius: 5 },
  btnText: { color: "white", fontWeight: "bold", fontSize: 12 },
});
