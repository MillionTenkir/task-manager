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
import { useTask } from "../../context/TaskContext";

const CompletedScreen = () => {
  const { getTasksByStatus, updateTask } = useTask();
  const completedTasks = getTasksByStatus("completed");

  const handleReopen = async (taskId) => {
    await updateTask(taskId, { status: "pending" });
  };

  const renderItem = ({ item }) => {
    let priorityColor = "#3498db";
    if (item.priority === "High") {
      priorityColor = "#e74c3c";
    } else if (item.priority === "Medium") {
      priorityColor = "#f39c12";
    } else if (item.priority === "Low") {
      priorityColor = "#2ecc71";
    }

    const completedDate = new Date(item.deadline);

    return (
      <View style={styles.taskItem}>
        <View style={styles.taskHeader}>
          <View
            style={[
              styles.priorityIndicator,
              { backgroundColor: priorityColor },
            ]}
          />
          <Text style={styles.taskTitle}>{item.title}</Text>
        </View>
        
        {item.description ? (
          <Text style={styles.taskDescription} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
        
        <View style={styles.taskDetails}>
          <View style={styles.taskMeta}>
            <View style={styles.metaItem}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color="#666"
                style={styles.icon}
              />
              <Text style={styles.metaText}>
                Completed on {completedDate.toLocaleDateString()}
              </Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons
                name="person-outline"
                size={16}
                color="#666"
                style={styles.icon}
              />
              <Text style={styles.metaText}>
                {item.assignedTo.name}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.reopenButton}
            onPress={() => handleReopen(item.id)}
          >
            <Ionicons name="refresh-outline" size={16} color="#3498db" />
            <Text style={styles.reopenText}>Reopen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.heading}>Completed Tasks</Text>

        {completedTasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-done-circle-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No completed tasks yet</Text>
          </View>
        ) : (
          <FlatList
            data={completedTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
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
    marginBottom: 8,
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
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskDescription: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
    marginLeft: 22,
  },
  taskDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 10,
    marginTop: 5,
  },
  taskMeta: {
    flex: 1,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 5,
  },
  metaText: {
    fontSize: 13,
    color: "#666",
  },
  reopenButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  reopenText: {
    fontSize: 13,
    color: "#3498db",
    marginLeft: 4,
  },
});

export default CompletedScreen;