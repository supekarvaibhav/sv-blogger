"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import { AppProvider } from "@/context/AppContext";
import { store } from "@/store";
import { hydrateAuth } from "@/store/authSlice";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    store.dispatch(hydrateAuth());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </AppProvider>
      </ThemeProvider>
    </Provider>
  );
}
