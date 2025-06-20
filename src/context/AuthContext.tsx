import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/router";

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: string;
  loadingData: boolean;
  setRole: (role: string) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  profile: User | null;
  setProfile: (profile: User | null) => void;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("");
  const [loadingData, setLoadingData] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);

  // Load token & user dari localStorage dan fetch profile
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setRole(savedRole || "");

      fetchProfile().finally(() => setLoadingData(false));
    } else {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
  if (profile?.role) {
    setRole(profile.role);
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("role", profile.role);
  }
}, [profile?.role]);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      setUser(response.data);
      setRole(response.data.role);

    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("role", response.data.role);
    } catch (error) {
      console.error("Gagal mengambil data profil:", error);
    }
  };

  const updateProfile = (newData: Partial<User>) => {
    setProfile((prev) => (prev ? { ...prev, ...newData } : null));
  };

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("role", newUser.role);

    setToken(newToken);
    setUser(newUser);
    setRole(newUser.role);

    fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setToken(null);
    setUser(null);
    setRole("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        loadingData,
        setRole,
        login,
        logout,
        profile,
        setProfile,
        fetchProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
