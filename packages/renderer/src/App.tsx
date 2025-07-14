import { useState, useEffect } from "react";
import { ToastProvider } from "./components/ToastProvider";
import type { AppProps } from "./types/base";
import { storage, type UserData } from "./utils/storage";
import { AppWithLogin } from "./components/AppWithLogin";

export default function SignIn({ onToggleTheme }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = storage.getToken();
    const user = storage.getUserData();

    if (token && user) {
      setIsAuthenticated(true);
      setUserData(user);
    }
  }, []);

  return (
    <ToastProvider>
      <AppWithLogin
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userData={userData}
        setUserData={setUserData}
        onToggleTheme={onToggleTheme}
      />
    </ToastProvider>
  );
}
