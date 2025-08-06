import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the authentication context
const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Function to log in
  const login = async (email, password) => {
    try {
      // This is where you would typically make an API call to authenticate
      // For this example, we'll simulate a successful login with dummy users based on email
      
      // Create two dummy users with different roles
      let dummyUserInfo;
      const dummyToken = "dummy-auth-token-123456789";
      
      // Check email to determine which dummy user to use
      if (email.toLowerCase().includes("admin")) {
        dummyUserInfo = {
          id: "1",
          name: "Admin User",
          email: email,
          role: "admin",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        };
      } else {
        dummyUserInfo = {
          id: "2",
          name: "Employee User",
          email: email,
          role: "employee",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        };
      }

      // Store user token and info in AsyncStorage
      await AsyncStorage.setItem("userToken", dummyToken);
      await AsyncStorage.setItem("userInfo", JSON.stringify(dummyUserInfo));

      // Update state
      setUserToken(dummyToken);
      setUserInfo(dummyUserInfo);

      return true;
    } catch (e) {
      console.error("Login error:", e);
      return false;
    }
  };

  // Function to register a new user
  const register = async (name, email, password) => {
    try {
      // This is where you would typically make an API call to register the user
      // For this example, we'll simulate a successful registration
      const dummyToken = "dummy-auth-token-" + Date.now();
      const dummyUserInfo = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: "New User",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      };

      // Store user token and info in AsyncStorage
      await AsyncStorage.setItem("userToken", dummyToken);
      await AsyncStorage.setItem("userInfo", JSON.stringify(dummyUserInfo));

      // Update state
      setUserToken(dummyToken);
      setUserInfo(dummyUserInfo);

      return true;
    } catch (e) {
      console.error("Registration error:", e);
      return false;
    }
  };

  // Function to log out
  const logout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userInfo");

      // Update state
      setUserToken(null);
      setUserInfo(null);

      return true;
    } catch (e) {
      console.error("Logout error:", e);
      return false;
    }
  };

  // Check if user is logged in on app start
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);

      // Get user token and info from AsyncStorage
      const userToken = await AsyncStorage.getItem("userToken");
      const userInfoString = await AsyncStorage.getItem("userInfo");

      if (userToken) {
        const userInfo = JSON.parse(userInfoString);
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setIsLoading(false);
    } catch (e) {
      console.error("isLoggedIn error:", e);
      setIsLoading(false);
    }
  };

  // Check login status on component mount
  useEffect(() => {
    console.log("Is logged in triggered.  ")
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
