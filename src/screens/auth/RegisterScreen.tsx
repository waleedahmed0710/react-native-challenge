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

const RegisterScreen = () => {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string[]>([]);

  const handleRegister = async () => {
    setLoading(true);
    setError([]);

    // Basic validation
    const validationErrors = [];
    if (!firstName.trim()) validationErrors.push("First name is required");
    if (!lastName.trim()) validationErrors.push("Last name is required");
    if (!email.trim()) validationErrors.push("Email is required");
    if (!password.trim()) validationErrors.push("Password is required");
    if (password.length < 8)
      validationErrors.push("Password must be at least 8 characters");

    if (validationErrors.length > 0) {
      setError(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register(
        firstName,
        lastName,
        email,
        password
      );
      if (response.success) {
        console.log("Registration successful");
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        router.replace("/(root)/(tabs)");
      } else {
        setError(["Registration failed"]);
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
        <Text style={styles.title}>Create Account</Text>
        <ErrorBanner errorMessages={error} />
        <View style={styles.formContainer}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor={colors.gray}
            autoCapitalize="words"
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor={colors.gray}
            autoCapitalize="words"
          />
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
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.gray}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.button}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => router.push("/(root)/(auth)/login")}
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default RegisterScreen;

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
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    backgroundColor: colors.white,
  },
  image: {
    width: "90%",
    height: 150,
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: colors.black,
    marginRight: 5,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
