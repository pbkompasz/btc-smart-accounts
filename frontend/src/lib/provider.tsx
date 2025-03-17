import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext({});

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Function to log in
  const login = (userData: SetStateAction<null>) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to log out
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};