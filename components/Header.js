import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/AuthContext";
const Header = () => {
  const { userInfo } = useAuth();
  console.log("user: ",userInfo)

  // Dummy user data

  const user = {
    name: "Million Tenkir",
    role: "Administrator",
    avatar:
      "https://drive.google.com/file/d/1TJQ6_YMIY8r625ESnx4T9AdIFmWXaigS/view?usp=drive_link",
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userRole}>{userInfo.role}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3498db",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    color: "#e0f2fe",
    fontSize: 16,
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
  },
  userRole: {
    color: "#e0f2fe",
    fontSize: 14,
  },
  avatarContainer: {
    marginLeft: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
  },
});

export default Header;
