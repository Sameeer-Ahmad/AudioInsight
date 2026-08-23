import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../backend-API/api";
import { AuthContext } from "../../context/authContext";

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${API}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("uploadSuccess");
        logout();
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
}
