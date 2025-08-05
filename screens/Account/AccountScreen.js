import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

const AccountScreen = () => {
  const { userInfo, logout } = useAuth();

  // Use userInfo from context instead of hardcoded data
  const user = userInfo || {
    name: "Million Tenkir",
    email: "million@example.com",
    role: "Administrator",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stats: {
      tasksCompleted: 156,
      projects: 8,
      streak: 5,
    },
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const menuItems = [
    { icon: "person-outline", title: "Edit Profile", chevron: true },
    { icon: "notifications-outline", title: "Notifications", chevron: true },
    { icon: "settings-outline", title: "Settings", chevron: true },
    { icon: "help-circle-outline", title: "Help & Support", chevron: true },
    { icon: "information-circle-outline", title: "About", chevron: true },
    {
      icon: "log-out-outline",
      title: "Log Out",
      chevron: false,
      color: "#e74c3c",
      onPress: handleLogout,
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.profileImage} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            {/* <Text style={styles.statNumber}>{user.stats.tasksCompleted}</Text> */}
            <Text style={styles.statLabel}>Tasks Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            {/* <Text style={styles.statNumber}>{user.stats.projects}</Text> */}
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            {/* <Text style={styles.statNumber}>{user.stats.streak}</Text> */}
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.color || "#3498db"}
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuTitle,
                    item.color && { color: item.color },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              {item.chevron && (
                <Ionicons name="chevron-forward" size={20} color="#999" />
              )}
            </TouchableOpacity>
          ))}
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
  },
  contentContainer: {
    paddingBottom: 120, // Extra space for bottom tabs
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#3498db",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  userRole: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  menuContainer: {
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 16,
    color: "#333",
  },
});

export default AccountScreen;
