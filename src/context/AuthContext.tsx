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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("");
  const [loadingData, setLoadingData] = useState(true);
    const [profile, setProfile] = useState<User | null>(null); // Tambahkan state profile
  const router = useRouter();


  // Load data dari localStorage ketika pertama kali render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setRole(savedRole || "");
    }
    setLoadingData(false);
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setProfile(data);
    } catch (error) {
      console.error("Gagal mengambil data profil:", error);
    }
  };

  // Load data saat pertama render
  // Load data saat pertama render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setRole(savedRole || "");
      // Fetch profil terbaru setelah load data dasar
      fetchProfile();
    }
    setLoadingData(false);
  }, []);

  // Pasang axios interceptor untuk inject token
  // useEffect(() => {
  //   const requestInterceptor = api.interceptors.request.use((config) => {
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   });

  //   const responseInterceptor = api.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       if (error.response?.status === 401) {
  //         logout();
  //         router.push("/auth/login");
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     api.interceptors.request.eject(requestInterceptor);
  //     api.interceptors.response.eject(responseInterceptor);
  //   };
  // }, [token]);

  // Saat login berhasil
  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("role", newUser.role);

    setToken(newToken);
    setUser(newUser);
    setRole(newUser.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setToken(null);
    setUser(null);
    setRole("");
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, loadingData, setRole, login, logout,
        profile, // Sertakan profile
        setProfile, // Sertakan setter
        fetchProfile, // Sertakan fungsi fetch
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
