import { Card, SignInContainer } from "../styled";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { storage } from "../../utils/storage";

interface Workspace {
  id: number;
  name: string;
  admin: boolean;
  premium: boolean;
  default_currency: string;
  default_hourly_rate: number;
}

export default function Settings() {
  const [workspace, setWorkspace] = useState("");
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const result = await window.togglAPI.getWorkspaces();
        if (result.success) {
          setWorkspaces(result.data);
        } else {
          console.error("Failed to fetch workspaces", result.error);
        }
      } catch (err) {
        console.error("Failed to fetch workspaces", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspaces();
  }, []);

  // Set workspace value only after workspaces are loaded
  useEffect(() => {
    if (!loading && workspaces.length > 0 && !initialized.current) {
      const userData = storage.getUserData();
      const settings = storage.getSettings();
      let initialWorkspace = "";
      if (
        settings.workspaceId &&
        workspaces.some(
          (ws) => ws.id.toString() === settings.workspaceId.toString()
        )
      ) {
        initialWorkspace = settings.workspaceId.toString();
      } else if (
        userData &&
        userData.default_workspace_id &&
        workspaces.some(
          (ws) => ws.id.toString() === userData.default_workspace_id.toString()
        )
      ) {
        initialWorkspace = userData.default_workspace_id.toString();
      }
      setWorkspace(initialWorkspace);
      initialized.current = true;
    }
  }, [loading, workspaces]);

  const handleSave = () => {
    storage.setSettings({ workspaceId: workspace });
  };

  return (
    <SignInContainer direction="column" justifyContent="center">
      <Card variant="outlined">
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          Settings
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="workspace-label">Current Workspace</InputLabel>
          <Select
            labelId="workspace-label"
            id="workspace-select"
            value={workspace}
            label="Current Workspace"
            onChange={(e) => setWorkspace(e.target.value)}
            disabled={loading}
          >
            <MenuItem value="" disabled>
              <em>Select your workspace</em>
            </MenuItem>
            {workspaces.map((ws) => (
              <MenuItem key={ws.id} value={ws.id.toString()}>
                {ws.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Card>
    </SignInContainer>
  );
}
