import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { useTask } from "../../context/TaskContext";
import { useRoute } from "@react-navigation/native";

const MyTasksScreen = () => {
  const route = useRoute();
  const { tasks, updateTask, isLoading } = useTask();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Get filter status from route params if available
  useEffect(() => {
    if (route.params?.filterStatus) {
      setActiveFilter(route.params.filterStatus);
    }
  }, [route.params]);

  // Filter tasks based on active filter
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === activeFilter));
    }
  }, [tasks, activeFilter]);

  const handleToggleStatus = async (task) => {
    let newStatus;
    if (task.status === "completed") {
      newStatus = "pending";
    } else {
      newStatus = "completed";
    }
    
    await updateTask(task.id, { status: newStatus });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "checkmark-circle";
      case "in_progress":
        return "reload-circle";
      case "expired":
        return "alert-circle";
      default:
        return "ellipse-outline";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#2ecc71";
      case "in_progress":
        return "#3498db";
      case "pending":
        return "#f39c12";
      case "expired":
        return "#e74c3c";
      default:
        return "#999";
    }
  };

  const renderItem = ({ item }) => {
    const statusColor = getStatusColor(item.status);
    const statusIcon = getStatusIcon(item.status);
    const isCompleted = item.status === "completed";
    const isExpired = item.status === "expired";

    return (
      <TouchableOpacity 
        style={styles.taskItem}
        onPress={() => !isExpired && handleToggleStatus(item)}
      >
        <View style={styles.taskHeader}>
          <View
            style={[
              styles.priorityIndicator,
              { backgroundColor: getStatusColor(item.priority.toLowerCase()) },
            ]}
          />
          <Text 
            style={[
              styles.taskTitle,
              isCompleted && styles.completedTaskTitle,
            ]}
          >
            {item.title}
          </Text>
        </View>
        
        <View style={styles.taskContent}>
          {item.description ? (
            <Text 
              style={[
                styles.taskDescription,
                isCompleted && styles.completedTaskText,
              ]}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          ) : null}
          
          <View style={styles.taskMeta}>
            <View style={styles.taskDeadline}>
              <Ionicons
                name="time-outline"
                size={16}
                color="#666"
                style={styles.icon}
              />
              <Text style={styles.deadlineText}>
                {new Date(item.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>
            </View>
            
            <View style={styles.assigneeContainer}>
              <Ionicons
                name="person-outline"
                size={16}
                color="#666"
                style={styles.icon}
              />
              <Text style={styles.assigneeText}>
                {item.assignedTo.name}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.taskDetails}>
          <View style={styles.statusContainer}>
            <Text 
              style={[
                styles.statusText, 
                { color: statusColor }
              ]}
            >
              {item.status.replace("_", " ")}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.checkbox, isExpired && styles.disabledCheckbox]}
            onPress={() => !isExpired && handleToggleStatus(item)}
            disabled={isExpired}
          >
            <Ionicons 
              name={statusIcon} 
              size={24} 
              color={statusColor} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterButton = (filter, label, icon) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === filter && styles.activeFilterButton,
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Ionicons
        name={icon}
        size={16}
        color={activeFilter === filter ? "#fff" : "#666"}
      />
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === filter && styles.activeFilterButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.heading}>My Tasks</Text>

        <View style={styles.filtersContainer}>
          {renderFilterButton("all", "All", "list-outline")}
          {renderFilterButton("pending", "Pending", "time-outline")}
          {renderFilterButton("in_progress", "In Progress", "reload-outline")}
          {renderFilterButton("completed", "Completed", "checkmark-done-outline")}
          {renderFilterButton("expired", "Expired", "alert-circle-outline")}
        </View>

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No tasks found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
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
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
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
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  activeFilterButton: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  filterButtonText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  activeFilterButtonText: {
    color: "#fff",
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
  },
  completedTaskTitle: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskContent: {
    marginLeft: 22,
    marginBottom: 10,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  completedTaskText: {
    color: "#999",
  },
  taskMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  taskDeadline: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  assigneeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  deadlineText: {
    fontSize: 13,
    color: "#666",
  },
  assigneeText: {
    fontSize: 13,
    color: "#666",
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
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  checkbox: {
    padding: 5,
  },
  disabledCheckbox: {
    opacity: 0.7,
  },
});

export default MyTasksScreen;