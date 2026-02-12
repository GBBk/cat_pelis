import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { getCurrentSession } from "./db/apiAuth";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<User | null>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentSession);
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
