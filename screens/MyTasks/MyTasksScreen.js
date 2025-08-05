import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";

const MyTasksScreen = () => {
  // Dummy tasks data
  const tasks = [
    {
      id: "1",
      title: "Complete project proposal",
      deadline: "Today, 5:00 PM",
      priority: "High",
    },
    {
      id: "2",
      title: "Review design mockups",
      deadline: "Tomorrow, 10:00 AM",
      priority: "Medium",
    },
    {
      id: "3",
      title: "Team meeting",
      deadline: "Today, 2:00 PM",
      priority: "High",
    },
    {
      id: "4",
      title: "Update documentation",
      deadline: "Friday, 12:00 PM",
      priority: "Low",
    },
    {
      id: "5",
      title: "Prepare presentation",
      deadline: "Thursday, 3:00 PM",
      priority: "Medium",
    },
  ];

  const renderItem = ({ item }) => {
    let priorityColor = "#3498db";
    if (item.priority === "High") {
      priorityColor = "#e74c3c";
    } else if (item.priority === "Medium") {
      priorityColor = "#f39c12";
    } else if (item.priority === "Low") {
      priorityColor = "#2ecc71";
    }

    return (
      <TouchableOpacity style={styles.taskItem}>
        <View style={styles.taskHeader}>
          <View
            style={[
              styles.priorityIndicator,
              { backgroundColor: priorityColor },
            ]}
          />
          <Text style={styles.taskTitle}>{item.title}</Text>
        </View>
        <View style={styles.taskDetails}>
          <View style={styles.taskDeadline}>
            <Ionicons
              name="time-outline"
              size={16}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.deadlineText}>{item.deadline}</Text>
          </View>
          <TouchableOpacity style={styles.checkbox}>
            <Ionicons name="square-outline" size={24} color="#3498db" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.heading}>My Tasks</Text>

        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 120, // Extra space for bottom tabs
  },
  taskItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  taskDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDeadline: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  deadlineText: {
    fontSize: 14,
    color: "#666",
  },
  checkbox: {
    padding: 5,
  },
});

export default MyTasksScreen;
