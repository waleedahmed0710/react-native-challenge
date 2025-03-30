import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Heading from "../components/Heading";
import { colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";

const GetStartedScreen = () => {
  const router = useRouter();
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Title fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Image slide-up and scale animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Button bounce animation
    Animated.sequence([
      Animated.delay(800),
      Animated.spring(buttonAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Heading
          textStyle={{
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 60,
            textAlign: "center",
            color: colors.primary,
            textTransform: "uppercase",
          }}
          title="Welcome"
        />
        <Heading
          textStyle={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: colors.black,
          }}
          title="Service Mania"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require("@/assets/images/onboarding.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Animated.Text style={[styles.infoText, { opacity: fadeAnim }]}>
          Get ready to explore a world of services at your fingertips.
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ scale: buttonAnim }],
          opacity: buttonAnim,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/(root)/(auth)/login")}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: "90%",
    height: 300,
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginTop: "35%",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    color: colors.black,
    marginTop: 20,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
});
