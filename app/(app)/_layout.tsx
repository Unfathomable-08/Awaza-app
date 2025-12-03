import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  // Still checking token from AsyncStorage
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Not logged in → kick out to welcome screen
  if (!user) {
    return <Redirect href="/welcome" />;
  }

  // Logged in → show the real app
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
    </Stack>
  );
}