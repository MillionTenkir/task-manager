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

const CompletedScreen = () => {
  // Dummy completed tasks data
  const completedTasks = [
    {
      id: "1",
      title: "Submit weekly report",
      completedDate: "Today, 11:30 AM",
    },
    {
      id: "2",
      title: "Client call with XYZ Corp",
      completedDate: "Yesterday, 2:15 PM",
    },
    {
      id: "3",
      title: "Update task board",
      completedDate: "Yesterday, 10:45 AM",
    },
    {
      id: "4",
      title: "Review marketing materials",
      completedDate: "Monday, 4:20 PM",
    },
    {
      id: "5",
      title: "Team standup meeting",
      completedDate: "Monday, 9:00 AM",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskItem}>
        <View style={styles.taskHeader}>
          <View style={styles.checkboxCompleted}>
            <Ionicons name="checkmark-circle" size={24} color="#2ecc71" />
          </View>
          <Text style={styles.taskTitle}>{item.title}</Text>
        </View>
        <View style={styles.taskDetails}>
          <View style={styles.completedInfo}>
            <Ionicons
              name="time-outline"
              size={16}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.dateText}>{item.completedDate}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.heading}>Completed Tasks</Text>

        <FlatList
          data={completedTasks}
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
    opacity: 0.9,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxCompleted: {
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1,
    textDecorationLine: "line-through",
    opacity: 0.8,
  },
  taskDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
});

export default CompletedScreen;
