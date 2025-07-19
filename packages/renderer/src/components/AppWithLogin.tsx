import { CssBaseline } from "@mui/material";
import { HeaderControls } from "./HeaderControls";
import Profile from "./tabs/profile";
import { LoginForm } from "./LoginForm";
import { useLogin } from "../hooks/useLogin";
import { storage, type UserData } from "../utils/storage";
import React from "react";
import { Timer } from "./tabs/Timer";
import { BottomTabs } from "./BottomTabs";
import Settings from "./tabs/Settings";

export function AppWithLogin({
  isAuthenticated,
  setIsAuthenticated,
  userData,
  setUserData,
  onToggleTheme,
}: {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  onToggleTheme: () => void;
}) {
  const { errors, isLoading, handleSubmit, handleLogout, resetErrors } =
    useLogin({
      onSubmit: async () => {
        const token = storage.getToken();
        const user = storage.getUserData();
        if (token && user) {
          setIsAuthenticated(true);
          setUserData(user);
        }
      },
      onLogout: () => {
        setIsAuthenticated(false);
        setUserData(null);
      },
    });

  const [activeTab, setActiveTab] = React.useState<
    "profile" | "timer" | "settings"
  >("profile");

  return (
    <section>
      <CssBaseline enableColorScheme />
      <div className="draggable-region" />
      <HeaderControls
        onToggleTheme={onToggleTheme}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      {isAuthenticated && userData ? (
        <>
          {activeTab === "profile" ? (
            <Profile
              onToggleTheme={onToggleTheme}
              onLogout={handleLogout}
              userData={userData}
            />
          ) : activeTab === "timer" ? (
            <Timer />
          ) : (
            <Settings />
          )}
          <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      ) : (
        <LoginForm
          errors={errors}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          resetErrors={resetErrors}
        />
      )}
    </section>
  );
}
