import { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "../api/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function onLoggedIn(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  function onLoggedOut() {
    localStorage.removeItem("user");
    setUser(null);
  }

  async function reloadUser() {
    try {
      const freshUser = await getUserById(user._id);
      setUser(freshUser);
    } catch (err) {
      console.error("Failed to reload user:", err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, onLoggedIn, onLoggedOut, reloadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
