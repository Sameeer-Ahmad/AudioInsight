import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../../backend-API/api";
import AuthField from "../../components/AuthField";
import PrimaryButton from "../../components/PrimaryButton";
import { colors, fonts } from "../../theme/tokens";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API}/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProfile(res.data))
      .catch((error) => {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile.");
      });
  }, []);

  const initials = (profile?.username || "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    setSaving(true);
    try {
      await axios.put(
        `${API}/user/me/password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const message = error.response?.data?.error || "Failed to update password.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Box mb={8}>
        <Text fontFamily={fonts.heading} fontSize="26px" fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary}>
          Profile
        </Text>
        <Text fontSize="14px" color={colors.textMuted} mt={1}>
          Your account details and password.
        </Text>
      </Box>

      <Flex
        align="center"
        gap="16px"
        bg={colors.bgSurface}
        border={`1px solid ${colors.border}`}
        borderRadius="16px"
        p="20px"
        mb={8}
        maxW="480px"
      >
        <Flex w="52px" h="52px" borderRadius="50%" bg={colors.accent2Tint} align="center" justify="center" flexShrink={0}>
          <Text fontFamily={fonts.heading} fontSize="17px" fontWeight={600} color={colors.accent2}>
            {initials || "?"}
          </Text>
        </Flex>
        <Flex direction="column" minW={0}>
          <Text fontSize="16px" fontWeight={600} color={colors.textPrimary} noOfLines={1}>
            {profile?.username || "—"}
          </Text>
          <Text fontSize="13.5px" color={colors.textMuted} noOfLines={1}>
            {profile?.email || "—"}
          </Text>
        </Flex>
      </Flex>

      <Box bg={colors.bgSurface} border={`1px solid ${colors.border}`} borderRadius="16px" p="24px" maxW="480px">
        <Text fontSize="16px" fontWeight={600} color={colors.textPrimary} mb="18px">
          Change Password
        </Text>
        <Box as="form" onSubmit={handleChangePassword}>
          <AuthField
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <AuthField
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <AuthField
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <PrimaryButton type="submit" isLoading={saving} loadingText="Updating">
            Update Password
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
