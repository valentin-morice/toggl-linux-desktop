import { CssBaseline } from "@mui/material";
import { HeaderControls } from "./HeaderControls";
import { Index } from "./Index";
import { LoginForm } from "./LoginForm";
import { useLogin } from "../hooks/useLogin";
import { storage, type UserData } from "../utils/storage";
import React from "react";

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
        <Index
          onToggleTheme={onToggleTheme}
          onLogout={handleLogout}
          userData={userData}
        />
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
