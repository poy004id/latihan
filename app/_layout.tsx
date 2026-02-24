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

export default function RootLayout() {
  const colorScheme = useColorScheme();
  console.log("Color Scheme:", colorScheme);
  const isLoggedIn = false;

  return (
    <PaperProvider
      theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>

          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
