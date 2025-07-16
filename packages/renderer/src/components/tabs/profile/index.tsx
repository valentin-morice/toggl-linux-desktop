import { Box, Typography, Avatar, Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import type { UserData } from "../../../utils/storage";
import { Card, SignInContainer } from "../../styled";
import ProfileInfoTable from "./ProfileInfoTable";

interface ProfileProps {
  onToggleTheme: () => void;
  onLogout: () => void;
  userData: UserData;
}

export function Profile({ userData }: ProfileProps) {
  const avatarSrc =
    userData.image_url === "https://assets.track.toggl.com/images/profile.png"
      ? "/avatar-placeholder.png"
      : userData.image_url;

  return (
    <SignInContainer direction="column" justifyContent="center">
      <Card variant="outlined">
        <Avatar
          src={avatarSrc}
          alt={userData.fullname}
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            mb: 1,
          }}
        >
          {userData.fullname.charAt(0).toUpperCase()}
        </Avatar>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
            {userData.fullname}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <MailOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
            {userData.email}
          </Typography>
        </Box>

        <ProfileInfoTable userData={userData} />
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          href={`https://track.toggl.com/profile/${userData.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Toggl
        </Button>
      </Card>
    </SignInContainer>
  );
}

export default Profile;
