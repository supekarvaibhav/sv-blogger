import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/types";

interface AuthPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  hydrated: false
};

export const hydrateAuth = createAsyncThunk("auth/hydrate", async () => {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = window.localStorage.getItem("sv_auth");
  if (!raw) {
    return null;
  }
  return JSON.parse(raw) as AuthPayload;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthPayload>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.hydrated = true;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("sv_auth", JSON.stringify(action.payload));
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.hydrated = true;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("sv_auth");
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateAuth.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.hydrated = true;
    });
    builder.addCase(hydrateAuth.rejected, (state) => {
      state.hydrated = true;
    });
  }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
