import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { API } from "../../backend-API/api";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import AuthField from "../../components/AuthField";
import PrimaryButton from "../../components/PrimaryButton";
import { colors } from "../../theme/tokens";

export function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    axios
      .post(`${API}/user/signup`, { username, email, password })
      .then(() => {
        toast.success("Successfully created an account!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating an account!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Get started with AudioInsight to transcribe, summarize, and ask questions about your audio."
      footer={
        <Text fontSize="13.5px" color={colors.textMuted}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: colors.accentText, fontWeight: 600 }}>
            Log in
          </Link>
        </Text>
      }
    >
      <Box as="form" onSubmit={handleSubmit}>
        <AuthField
          label="Username"
          id="username"
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <AuthField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <PrimaryButton
          type="submit"
          w="full"
          mt="6px"
          isLoading={loading}
          loadingText="Creating account"
          rightIcon={<IconArrowRight size={16} />}
        >
          Sign Up
        </PrimaryButton>
      </Box>
    </AuthCard>
  );
}
