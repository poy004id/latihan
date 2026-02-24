import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    Text,
    TextInput
} from "react-native-paper";

export default function LoginScreen() {
  const [username, setUsername] = useState("user1");
  const [password, setPassword] = useState("password123");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) return;
    setLoading(true);
    try {
        const response = await login(username, password);
        if (response.success) {
          console.log("Login successful:", response);
        } else {
          console.log("Login failed:", response.message);
        }
    } catch (error) {
      console.log("Login failed:", error);
      console.log("Login failed:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

return (
    <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="headlineMedium" style={styles.title}>
                    Login
                </Text>

                <TextInput
                    label="Username"
                    mode="outlined"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    autoCapitalize="none"
                />

                <TextInput
                    label="Password"
                    mode="outlined"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                    style={styles.input}
                    right={
                        <TextInput.Icon
                            icon={secureText ? "eye-off" : "eye"}
                            onPress={() => setSecureText(!secureText)}
                        />
                    }
                />

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    disabled={loading}
                    style={styles.button}
                    loading={loading}
                >
                     Login
                </Button>

                <Button mode="text" style={styles.forgot}>
                    Forgot Password?
                </Button>
            </Card.Content>
        </Card>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  forgot: {
    marginTop: 10,
  },
});