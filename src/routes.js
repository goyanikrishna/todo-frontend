import { Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import setAuthToken from "./utils/setAuthToken";
import { jwtDecode } from "jwt-decode";
import store from "./redux/store";
import { logout, setLogin } from "./redux/actions/authActions/login";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(setLogin(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/login";
  }
}

export default function Router() {
  const isAuthenticated = !!localStorage.jwtToken;

  return useRoutes([
    isAuthenticated
      ? {
          path: "/",
          children: [
            { path: "/", element: <Navigate to="/app/dashboard" /> },
            { path: "/app", element: <Navigate to="/app/dashboard" /> },
            { path: "/app/dashboard", element: <Dashboard /> },
          ],
        }
      : {
          path: "/",
          children: [
            { path: "/", element: <Navigate to="/login" /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
          ],
        },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
