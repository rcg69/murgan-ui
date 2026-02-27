"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/lib/apiClient";
import { decodeJwtPayload, extractRoles } from "@/lib/jwt";
import { clearStoredAccessToken, getStoredAccessToken, storeAccessToken } from "@/lib/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Keep token primarily in memory; localStorage only for refresh survival.
    const stored = getStoredAccessToken();
    if (stored) setAccessToken(stored);
    setIsHydrated(true);
  }, []);

  const payload = useMemo(() => decodeJwtPayload(accessToken), [accessToken]);
  const roles = useMemo(() => extractRoles(payload), [payload]);
  const isAdmin = roles.includes("ROLE_ADMIN") || roles.includes("ADMIN");

  const login = useCallback(async ({ usernameOrEmail, password }) => {
    const res = await authApi.login({ usernameOrEmail, password });
    const token = res?.accessToken;
    if (!token) throw new Error("Login succeeded but no accessToken returned.");
    setAccessToken(token);
    storeAccessToken(token);
    return res;
  }, []);

  const register = useCallback(async ({ username, email, password }) => {
    return authApi.register({ username, email, password });
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    clearStoredAccessToken();
  }, []);

  const value = useMemo(
    () => ({
      isHydrated,
      isAuthenticated: Boolean(accessToken),
      accessToken,
      roles,
      isAdmin,
      login,
      register,
      logout,
      jwtPayload: payload,
    }),
    [isHydrated, accessToken, roles, isAdmin, login, register, logout, payload]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

