import type { AppProps } from "next/app";
import "../styles/global.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
import { initializeAPI } from "@/app/api";

export default function MyApp({ Component, pageProps }: AppProps) {
  const firebaseApp = initializeAPI();

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
