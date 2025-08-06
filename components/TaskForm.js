import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

const TaskForm = ({ visible, onClose }) => {
  const { addTask } = useTask();
  const { userInfo } = useAuth();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [assignee, setAssignee] = useState({ id: userInfo?.id, name: userInfo?.name });
  
  // Dummy users for assignment (in a real app, you'd fetch these from an API)
  const users = [
    { id: "1", name: "Admin User" },
    { id: "2", name: "Employee User" },
  ];

  // Reset form when modal is opened
  useEffect(() => {
    if (visible) {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDeadline(new Date());
      setAssignee({ id: userInfo?.id, name: userInfo?.name });
    }
  }, [visible, userInfo]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Task title is required");
      return;
    }

    const newTask = {
      title,
      description,
      priority,
      deadline: deadline.toISOString(),
      status: "pending",
      assignedTo: assignee,
    };

    const success = await addTask(newTask);
    if (success) {
      onClose();
    } else {
      Alert.alert("Error", "Failed to create task");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create New Task</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
              placeholderTextColor="#999"
            />

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter task description"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.inputLabel}>Priority</Text>
            <View style={styles.priorityContainer}>
              {["Low", "Medium", "High"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.priorityButton,
                    priority === item && styles.priorityButtonActive,
                    { backgroundColor: item === "Low" ? "#2ecc71" : item === "Medium" ? "#f39c12" : "#e74c3c" },
                  ]}
                  onPress={() => setPriority(item)}
                >
                  <Text style={styles.priorityButtonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Deadline</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar" size={20} color="#3498db" style={styles.dateIcon} />
              <Text style={styles.dateText}>{formatDate(deadline)}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={deadline}
                mode="datetime"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text style={styles.inputLabel}>Assign To</Text>
            <View style={styles.assigneeContainer}>
              {users.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={[
                    styles.assigneeButton,
                    assignee?.id === user.id && styles.assigneeButtonActive,
                  ]}
                  onPress={() => setAssignee(user)}
                >
                  <Text style={[
                    styles.assigneeButtonText,
                    assignee?.id === user.id && styles.assigneeButtonTextActive,
                  ]}>
                    {user.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Create Task</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    padding: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  priorityButtonActive: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  priorityButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateIcon: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  assigneeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  assigneeButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  assigneeButtonActive: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  assigneeButtonText: {
    color: "#333",
  },
  assigneeButtonTextActive: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TaskForm;