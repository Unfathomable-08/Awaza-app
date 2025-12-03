import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/contexts/authContext";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="compose-post" />
      {/* <Stack.Screen name="inbox" /> */}
    </Stack>
  );
}