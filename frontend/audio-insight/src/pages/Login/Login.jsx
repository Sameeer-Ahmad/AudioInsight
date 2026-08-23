import { useContext, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { API } from "../../backend-API/api";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import AuthCard from "../../components/AuthCard";
import AuthField from "../../components/AuthField";
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../theme/tokens";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${API}/user/login`, { email, password })
      .then((res) => {
        toast.success("Successfully logged in!");
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("username", res.data.username);
        login(res.data.accessToken);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in login!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to your account to continue."
      footer={
        <Text fontSize="13.5px" color={colors.textMuted}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{ color: colors.accentText, fontWeight: 600 }}>
            Sign up
          </Link>
        </Text>
      }
    >
      <Box as="form" onSubmit={handleSubmit}>
        <AuthField
          label="Email Address"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthField
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PrimaryButton
          type="submit"
          w="full"
          mt="6px"
          isLoading={loading}
          loadingText="Logging in"
          rightIcon={<IconArrowRight size={16} />}
        >
          Log In
        </PrimaryButton>
      </Box>
    </AuthCard>
  );
}
