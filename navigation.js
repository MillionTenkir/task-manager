import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import Auth screens
import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";
import LoadingScreen from "./screens/Auth/LoadingScreen";

// Import App screens
import HomeScreen from "./screens/Home/HomeScreen";
import MyTasksScreen from "./screens/MyTasks/MyTasksScreen";
import CompletedScreen from "./screens/Completed/CompletedScreen";
import AccountScreen from "./screens/Account/AccountScreen";

// Import Auth context
import { useAuth } from "./context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Auth Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

// Admin Navigator with Bottom Tabs
const AdminTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "My Tasks") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Completed") {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Tasks" component={MyTasksScreen} />
      <Tab.Screen name="Completed" component={CompletedScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

// Employee Navigator with Bottom Tabs (limited access)
const EmployeeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "My Tasks") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Completed") {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="My Tasks" component={MyTasksScreen} />
      <Tab.Screen name="Completed" component={CompletedScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

// Root Navigator
export default function Navigation() {
  const { isLoading, userToken, userInfo } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  // Determine which navigation to show based on user role
  const renderNavigator = () => {
    if (!userToken) return <AuthStack />;
    
    // Check user role and render appropriate tabs
    if (userInfo && userInfo.role === 'admin') {
      return <AdminTabs />;
    } else {
      return <EmployeeTabs />;
    }
  };

  return (
    <NavigationContainer>
      {renderNavigator()}
    </NavigationContainer>
  );
}
