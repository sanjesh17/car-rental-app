import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  driver: null,
  token: null,
  login: () => {},
  driverLogin: () => {},
  logout: () => {},
  driverLogout: () => {},
  isAuthenticated: false,
  isDriverAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [driver, setDriver] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAndSetToken = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");
    if (storedToken) {
      try {
        const decodedUser = decodeToken(storedToken);
        if (storedUserType === "driver") {
          setDriver(decodedUser);
          setIsDriverAuthenticated(true);
        } else {
          setUser(decodedUser);
          setIsAuthenticated(true);
        }
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setLoading(false);
  };

  // User login function
  const login = (newToken, user) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userType", "user");
    setUser(user);
    setToken(newToken);
    setIsAuthenticated(true);
    setLoading(false);
  };

  // Driver login function
  const driverLogin = (newToken, driver) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userType", "driver");
    setDriver(driver);
    setToken(newToken);
    setIsDriverAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setUser(null);
    setDriver(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsDriverAuthenticated(false);
  };

  const driverLogout = () => {
    localStorage.removeItem("token");
    setDriver(null);
    setToken(null);
    setIsDriverAuthenticated(false);
  };

  useEffect(() => {
    checkAndSetToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        driver,
        token,
        login,
        driverLogin,
        logout,
        driverLogout,
        isAuthenticated,
        isDriverAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const payload = JSON.parse(window.atob(base64));

    if (payload.exp * 1000 < Date.now()) {
      throw new Error("Token expired");
    }

    return {
      id: payload.id,
      name: payload.name,
      phoneNumber: payload.phone,
      role: payload.role,
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

async function validateToken(token) {
  try {
    const response = await axios.post("/api/validate-token", { token });
    return response.data.valid;
  } catch (error) {
    return false;
  }
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const setupAxiosInterceptors = (logout) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};

export const ProtectedRoute = ({ children, type = "user" }) => {
  const { isAuthenticated, isDriverAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (type === "user" && !isAuthenticated) {
        navigate("/auth/signup");
      } else if (type === "driver" && !isDriverAuthenticated) {
        navigate("/auth/driver/signup");
      }
    }
  }, [isAuthenticated, isDriverAuthenticated, loading, navigate, type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthContext;
