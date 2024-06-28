import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { API } from "../../backend-API/api";
import { AuthContext } from "../../context/authContext";
// import { useAuth } from "../../context/authContext";
function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)
  const handleLogout = async () => {
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
console.log("Logout successful");
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      bg={"#881337"}
      color={"white"}
      _hover={{ bg: "#4c0519" }}
      pl={8}
      pr={8}
    >
      Logout
    </Button>
  );
}

export default Logout;
