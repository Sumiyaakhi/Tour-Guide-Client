"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser, logout } from "../services/AuthService";
import { IUser } from "../types";

// Define the context with an additional token field
const UserContext = createContext<IUserProviderValues | undefined>(undefined);

interface IUserProviderValues {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  logoutUser: () => void;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle fetching the user and token
  const handleUser = async () => {
    try {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        setToken(storedToken);

        // Fetch the user using the stored token
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logoutUser(); // Log the user out in case of an error
    } finally {
      setIsLoading(false);
    }
  };

  // Function to log the user out
  const logoutUser = () => {
    logout();
    setUser(null);
    setToken(null);
  };

  // Fetch the user and token on component mount
  useEffect(() => {
    handleUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isLoading,
        setUser,
        setToken,
        setIsLoading,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
