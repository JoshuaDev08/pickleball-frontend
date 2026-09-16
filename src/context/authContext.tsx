import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import authService from "../services/authService";
import type { LoginRequest, User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = user !== null;

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("auth_token");

      // No token means the visitor is simply logged out.
      // Do not call the protected /auth/me endpoint.
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const currentUser = await authService.me();

        setUser(currentUser);
      } catch (error: any) {
        // A 401 means the token is missing, expired, or invalid.
        if (error.response?.status === 401) {
          localStorage.removeItem("auth_token");
          setUser(null);
        } else {
          console.error("Failed to load authenticated user:", error);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);

    /*
     * Adjust this line if your login response uses
     * a different property name for the token.
     */
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
    }

    setUser(response.data.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
