import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authed = localStorage.getItem("learnify_authed");
    if (authed === "1") {
      setUser({ name: "placeholder" }); // or fetch real user
    }
  }, []);

  function onLoggedIn(userData) {
    localStorage.setItem("learnify_authed", "1");
    setUser(userData || { name: "Guest" });
  }

  function onLoggedOut() {
    localStorage.removeItem("learnify_authed");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, onLoggedIn, onLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
