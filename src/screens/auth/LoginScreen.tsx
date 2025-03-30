import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { colors } from "@/src/constants/colors";
import CustomKeyboardView from "@/src/components/CustomKeyboardView";
import { authService } from "@/src/services/auth.service";
import ErrorBanner from "@/src/components/ErrorBanner";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string[]>([]);

  const handleLogin = async () => {
    setLoading(true);
    setError([]);
    try {
      const response = await authService.login(email, password);
      console.log("Login response:", response);
      if (response.success) {
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        router.replace("/(root)/(tabs)");
      } else {
        setError(["Login failed"]);
      }
    } catch (err) {
      if ((err as any)?.response?.data?.message) {
        console.error((err as any).response.data.message);
        return setError([(err as any).response.data.message]);
      } else if (err instanceof Error) {
        console.error(err.message);
        return setError([err.message]);
      } else {
        return setError(["An error occurred. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyboardView>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/auth.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back</Text>
        <ErrorBanner errorMessages={error} />
        <View style={styles.formContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.gray}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.gray}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={() => handleLogin()}
            style={styles.button}
            // disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => router.push("/(root)/(auth)/register")}
            >
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.white,
  },
  image: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: colors.black,
    marginRight: 5,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
