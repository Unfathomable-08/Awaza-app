import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";
import React from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Public routes */}
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(auth)" />
        
        {/* Protected routes */}
        <Stack.Screen name="(app)" />
      </Stack>
    </AuthProvider>
  );
}