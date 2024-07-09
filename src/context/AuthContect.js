import { onAuthStateChanged } from "firebase/auth";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [curentUser, setCurentUser] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurentUser(user), setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={curentUser}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
