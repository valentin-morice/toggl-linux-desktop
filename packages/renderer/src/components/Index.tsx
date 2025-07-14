import { Box, Typography, Button, Avatar } from "@mui/material";
import type { UserData } from "../utils/storage";
import { Card, SignInContainer } from "./styled";

interface IndexProps {
  onToggleTheme: () => void;
  onLogout: () => void;
  userData: UserData;
}

export function Index({ userData }: IndexProps) {
  return (
    <SignInContainer direction="column" justifyContent="center">
      <Card variant="outlined">
        <Avatar
          src={userData.image_url}
          alt={userData.fullname}
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 3,
            bgcolor: "primary.main",
          }}
        >
          {userData.fullname.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          Welcome back, {userData.fullname}!
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {userData.email}
        </Typography>

        <Box sx={{ textAlign: "left", mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Timezone:</strong> {userData.timezone}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Workspace ID:</strong> {userData.default_workspace_id}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>2FA Enabled:</strong>{" "}
            {userData["2fa_enabled"] ? "Yes" : "No"}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Timer functionality coming soon...
        </Typography>

        <Button variant="contained" fullWidth disabled sx={{ mb: 2 }}>
          Start Timer
        </Button>

        <Button variant="outlined" fullWidth disabled>
          View Reports
        </Button>
      </Card>
    </SignInContainer>
  );
}
