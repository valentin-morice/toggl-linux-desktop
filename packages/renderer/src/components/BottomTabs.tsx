import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonIcon from "@mui/icons-material/Person";
import TimerIcon from "@mui/icons-material/Timer";
import { useTheme } from "@mui/material/styles";

interface BottomTabsProps {
  activeTab: "profile" | "timer";
  setActiveTab: React.Dispatch<React.SetStateAction<"profile" | "timer">>;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const theme = useTheme();
  const tabIndex = activeTab === "profile" ? 0 : 1;
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        width: "100vw",
        zIndex: 1000,
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) =>
          setActiveTab(newValue === 0 ? "profile" : "timer")
        }
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<PersonIcon />} aria-label="Profile" />
        <Tab icon={<TimerIcon />} aria-label="Timer" />
      </Tabs>
    </div>
  );
};
