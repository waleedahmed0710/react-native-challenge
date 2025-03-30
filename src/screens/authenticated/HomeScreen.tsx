import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/src/constants/colors";
import { businessService } from "@/src/services/businesses.service";
import { BusinessData, ServicesData, UserData } from "@/src/types";
import { servicesService } from "@/src/services/services.service";
import ServiceCard from "@/src/components/ServiceCard";
import BusinessCard from "@/src/components/BusinessCard";
import { router } from "expo-router";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

const HomeScreen = () => {
  const [user, setUser] = React.useState<UserData | null>(null);
  const [businesses, setBusinesses] = React.useState<BusinessData[]>([]);
  const [services, setServices] = React.useState<ServicesData[]>([]);
  const { isConnected } = useNetworkStatus();

  React.useEffect(() => {
    if (!isConnected) {
      businessService
        .getAllBusinesses()
        .then(async (response) => {
          if (response.success) {
            setBusinesses(response.data.slice(0, 10));
            await AsyncStorage.setItem(
              "businesses-cached",
              JSON.stringify(response.data.slice(0, 10))
            );
          } else {
            console.error("Failed to fetch businesses");
          }
        })
        .catch((error) => {
          if (error.message.includes("token not found")) {
            router.replace("/(root)/(auth)/login");
          }
        });
      servicesService
        .getAllServices()
        .then(async (response) => {
          if (response.success) {
            setServices(response.data.slice(0, 10));
            await AsyncStorage.setItem(
              "services-cached",
              JSON.stringify(response.data.slice(0, 10))
            );
          } else {
            console.error("Failed to fetch businesses");
          }
        })
        .catch((error) => {
          console.error("Error fetching businesses:", error.message);
          if (error.message.includes("token not found")) {
            router.replace("/(root)/(auth)/login");
          }
        });
    } else {
      AsyncStorage.getItem("businesses-cached")
        .then((value) => {
          if (value !== null) {
            setBusinesses(JSON.parse(value));
          }
        })
        .catch((error) => {
          console.error("Failed to fetch businesses", error);
        });
      AsyncStorage.getItem("services-cached")
        .then((value) => {
          if (value !== null) {
            setServices(JSON.parse(value));
          }
        })
        .catch((error) => {
          console.error("Failed to fetch services", error);
        });
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("user");
        if (value !== null) {
          setUser(JSON.parse(value));
          console.log("User data:", JSON.parse(value));
        }
      } catch (e) {
        console.error("Failed to fetch user data", e);
      }
    };
    getData();
  }, []);

  // Generate name for avatar
  const avatarName =
    user?.name ||
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
    "User";

  // Avatar URL
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    avatarName
  )}&background=random&color=fff&size=128`;

  return (
    <View style={styles.container}>
      <View style={styles.profileRow}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.welcomeText}>
          Hello, {user?.first_name || avatarName}
        </Text>
      </View>
      <View>
        <ServiceCard services={services} />
        <BusinessCard services={services} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.black,
  },
});
