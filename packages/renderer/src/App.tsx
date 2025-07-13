import CssBaseline from "@mui/material/CssBaseline";
import { ThemeToggle } from "./components/ThemeToggle";
import { LoginForm } from "./components/LoginForm";
import { ToastProvider } from "./components/ToastProvider";
import type { AppProps } from "./types/base";

export default function SignIn({ onToggleTheme }: AppProps) {
  const handleFormSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <ToastProvider>
      <section>
        <CssBaseline enableColorScheme />
        <div className="draggable-region" />
        <ThemeToggle onToggle={onToggleTheme} />
        <LoginForm onSubmit={handleFormSubmit} />
      </section>
    </ToastProvider>
  );
}
