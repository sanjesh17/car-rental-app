import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
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
    const storedAuthType = localStorage.getItem("authType");

    if (storedToken) {
      try {
        await validateToken(storedToken);
        const decodedData = decodeToken(storedToken);
        
        if (storedAuthType === "driver") {
          setDriver(decodedData);
          setIsDriverAuthenticated(true);
        } else {
          setUser(decodedData);
          setIsAuthenticated(true);
        }
        
        setToken(storedToken);
      } catch (error) {
        if (storedAuthType === "driver") {
          driverLogout();
        } else {
          logout();
        }
      }
    }
    setLoading(false);
  };

  // User login function
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("authType", "user");
    window.dispatchEvent(new Event("storage"));

    const decodedUser = decodeToken(newToken);
    setUser(decodedUser);
    setDriver(null);
    setToken(newToken);
    setIsAuthenticated(true);
    setIsDriverAuthenticated(false);
    setLoading(false);
  };

  // Driver login function
  const driverLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("authType", "driver");
    window.dispatchEvent(new Event("storage"));

    const decodedDriver = decodeToken(newToken);
    setDriver(decodedDriver);
    console.log(decodedDriver);
    setUser(null);
    setToken(newToken);
    setIsDriverAuthenticated(true);
    setIsAuthenticated(false);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    window.dispatchEvent(new Event("storage"));

    setUser(null);
    setDriver(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsDriverAuthenticated(false);
    setLoading(false);
  };

  const driverLogout = () => {
    logout();
  };

  useEffect(() => {
    checkAndSetToken();

    const handleStorageChange = (event) => {
      if (event.key === "token") {
        if (event.newValue) {
          checkAndSetToken();
        } else {
          logout();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
}

async function validateToken(token) {
  try {
    const authType = localStorage.getItem("authType");
    const endpoint = authType === "driver" ? "/api/validate-token" : "/api/validate-token";
    
    await axios.post(
      endpoint,
      { token },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
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
        const authType = localStorage.getItem("authType");
        if (authType === "driver") {
          logout("driver");
        } else {
          logout("user");
        }
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
      if (type === "driver" && !isDriverAuthenticated) {
        navigate("/auth/driver/signup");
      } else if (type === "user" && !isAuthenticated) {
        navigate("/auth/signup");
      }
    }
  }, [isAuthenticated, isDriverAuthenticated, loading, navigate, type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (type === "driver") {
    return isDriverAuthenticated ? children : null;
  }

  return isAuthenticated ? children : null;
};

export default AuthContext;