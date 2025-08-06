import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { useTask } from "../context/TaskContext";

const screenWidth = Dimensions.get("window").width;

const TaskChart = ({ chartType = "pie" }) => {
  const { getTaskStats } = useTask();
  const stats = getTaskStats();

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };

  const pieChartData = [
    {
      name: "Completed",
      population: stats.completed,
      color: "#2ecc71",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "In Progress",
      population: stats.inProgress,
      color: "#3498db",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Pending",
      population: stats.pending,
      color: "#f39c12",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Expired",
      population: stats.expired,
      color: "#e74c3c",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  const barChartData = {
    labels: ["Completed", "In Progress", "Pending", "Expired"],
    datasets: [
      {
        data: [stats.completed, stats.inProgress, stats.pending, stats.expired],
      },
    ],
    barColors: ["#2ecc71", "#3498db", "#f39c12", "#e74c3c"],
  };

  if (stats.total === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No tasks available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#2ecc71" }]}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#3498db" }]}>{stats.inProgress}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#e74c3c" }]}>{stats.expired}</Text>
          <Text style={styles.statLabel}>Expired</Text>
        </View>
      </View>

      {chartType === "pie" ? (
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 0]}
          absolute
        />
      ) : (
        <BarChart
          data={barChartData}
          width={screenWidth - 40}
          height={200}
          chartConfig={{
            ...chartConfig,
            barPercentage: 0.7,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{ borderRadius: 8 }}
          fromZero
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  noDataContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 40,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
  },
});

export default TaskChart;