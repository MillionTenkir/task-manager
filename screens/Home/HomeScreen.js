import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import TaskChart from "../../components/TaskChart";
import TaskStatusCard from "../../components/TaskStatusCard";
import TaskForm from "../../components/TaskForm";
import { useTask } from "../../context/TaskContext";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [activeChart, setActiveChart] = useState("pie");
  const { getTaskStats } = useTask();
  const navigation = useNavigation();
  const stats = getTaskStats();

  const handleStatusCardPress = (status) => {
    navigation.navigate("MyTasks", { filterStatus: status });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Dashboard</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowTaskForm(true)}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Task Overview</Text>
            <View style={styles.chartTypeToggle}>
              <TouchableOpacity
                style={[
                  styles.chartTypeButton,
                  activeChart === "pie" && styles.activeChartTypeButton,
                ]}
                onPress={() => setActiveChart("pie")}
              >
                <Ionicons 
                  name="pie-chart" 
                  size={18} 
                  color={activeChart === "pie" ? "#3498db" : "#999"} 
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.chartTypeButton,
                  activeChart === "bar" && styles.activeChartTypeButton,
                ]}
                onPress={() => setActiveChart("bar")}
              >
                <Ionicons 
                  name="stats-chart" 
                  size={18} 
                  color={activeChart === "bar" ? "#3498db" : "#999"} 
                />
              </TouchableOpacity>
            </View>
          </View>
          <TaskChart chartType={activeChart} />
        </View>

        <Text style={styles.sectionTitle}>Task Status</Text>
        
        <TaskStatusCard
          status="pending"
          title="Pending Tasks"
          icon="time-outline"
          color="#f39c12"
          onPress={() => handleStatusCardPress("pending")}
        />
        
        <TaskStatusCard
          status="in_progress"
          title="In Progress"
          icon="reload-outline"
          color="#3498db"
          onPress={() => handleStatusCardPress("in_progress")}
        />
        
        <TaskStatusCard
          status="completed"
          title="Completed Tasks"
          icon="checkmark-done-outline"
          color="#2ecc71"
          onPress={() => handleStatusCardPress("completed")}
        />
        
        <TaskStatusCard
          status="expired"
          title="Expired Tasks"
          icon="alert-circle-outline"
          color="#e74c3c"
          onPress={() => handleStatusCardPress("expired")}
        />
      </ScrollView>

      <TaskForm 
        visible={showTaskForm} 
        onClose={() => setShowTaskForm(false)} 
      />
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
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 120, // Extra space for bottom tabs
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#3498db",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  chartContainer: {
    marginBottom: 25,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  chartTypeToggle: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 4,
  },
  chartTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeChartTypeButton: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
});

export default HomeScreen;