import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <Navigation />
        </SafeAreaProvider>
      </TaskProvider>
    </AuthProvider>
  );
}
