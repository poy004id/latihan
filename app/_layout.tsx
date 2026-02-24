import { AuthProvider, useAuth } from "@/context/AuthContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavigator() {
  const colorScheme = useColorScheme();
  console.log("Color Scheme:", colorScheme);
  const { isAuthenticated } = useAuth();

  return (
    <PaperProvider
      theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Protected guard={isAuthenticated}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack.Protected>

            <Stack.Protected guard={!isAuthenticated}>
              <Stack.Screen
                name="auth/login"
                options={{ headerShown: false }}
              />
            </Stack.Protected>
          </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}


export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
