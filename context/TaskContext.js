import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial dummy tasks
  const initialTasks = [
    {
      id: "1",
      title: "Complete project proposal",
      description: "Create a detailed proposal for the new client project",
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      priority: "High",
      status: "in_progress",
      assignedTo: {
        id: "1",
        name: "Admin User",
      },
      createdBy: "1",
    },
    {
      id: "2",
      title: "Review design mockups",
      description: "Review and provide feedback on the new UI designs",
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
      priority: "Medium",
      status: "pending",
      assignedTo: {
        id: "2",
        name: "Employee User",
      },
      createdBy: "1",
    },
    {
      id: "3",
      title: "Team meeting",
      description: "Weekly team sync-up meeting",
      deadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      priority: "High",
      status: "completed",
      assignedTo: {
        id: "1",
        name: "Admin User",
      },
      createdBy: "1",
    },
    {
      id: "4",
      title: "Update documentation",
      description: "Update the project documentation with recent changes",
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
      priority: "Low",
      status: "pending",
      assignedTo: {
        id: "2",
        name: "Employee User",
      },
      createdBy: "2",
    },
    {
      id: "5",
      title: "Prepare presentation",
      description: "Create slides for the client presentation",
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      priority: "Medium",
      status: "in_progress",
      assignedTo: {
        id: "1",
        name: "Admin User",
      },
      createdBy: "1",
    },
    {
      id: "6",
      title: "Code review",
      description: "Review pull requests for the new feature",
      deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      priority: "High",
      status: "expired",
      assignedTo: {
        id: "2",
        name: "Employee User",
      },
      createdBy: "1",
    },
  ];

  // Load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const storedTasks = await AsyncStorage.getItem("tasks");
      
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // If no tasks are stored, use initial dummy tasks
        setTasks(initialTasks);
        await AsyncStorage.setItem("tasks", JSON.stringify(initialTasks));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading tasks:", error);
      setIsLoading(false);
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  // Add a new task
  const addTask = async (task) => {
    try {
      const newTask = {
        ...task,
        id: Date.now().toString(),
        createdBy: userInfo?.id || "unknown",
      };
      
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error("Error adding task:", error);
      return false;
    }
  };

  // Update an existing task
  const updateTask = async (taskId, updatedData) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, ...updatedData } : task
      );
      
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error("Error updating task:", error);
      return false;
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  };

  // Get task statistics
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === "completed").length;
    const inProgress = tasks.filter(task => task.status === "in_progress").length;
    const pending = tasks.filter(task => task.status === "pending").length;
    const expired = tasks.filter(task => task.status === "expired").length;
    
    return {
      total,
      completed,
      inProgress,
      pending,
      expired,
    };
  };

  // Get tasks by status
  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  // Get tasks by assignee
  const getTasksByAssignee = (assigneeId) => {
    return tasks.filter(task => task.assignedTo.id === assigneeId);
  };

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        addTask,
        updateTask,
        deleteTask,
        getTaskStats,
        getTasksByStatus,
        getTasksByAssignee,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTask = () => {
  return useContext(TaskContext);
};

export default TaskContext;