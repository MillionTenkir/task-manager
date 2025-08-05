import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.heading}>Dashboard</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Tasks</Text>
          <Text style={styles.cardContent}>
            You have 5 tasks remaining for today
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Progress</Text>
          <Text style={styles.cardContent}>
            You've completed 12 tasks this week
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <Text style={styles.cardContent}>
            Updated project timeline - 2 hours ago
          </Text>
        </View>
      </ScrollView>
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
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;
