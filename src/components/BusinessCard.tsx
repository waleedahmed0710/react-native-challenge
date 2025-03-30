import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { ServicesData } from "../types";
import { colors } from "../constants/colors";

interface BusinessCardProps {
  services: ServicesData[];
  onRefresh?: () => Promise<void>;
}

const BusinessCard = ({ services, onRefresh }: BusinessCardProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  return (
    <View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={{
                uri: `https://picsum.photos/seed/${item.id + 20}/250/150`,
              }}
              style={{ width: 150, height: 100 }}
            />
            <View style={{ padding: 2 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.black,
                  marginVertical: 2,
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.black,
                  marginVertical: 2,
                }}
                numberOfLines={1}
              >
                {item.description.length > 25
                  ? item.description.slice(0, 25) + "..."
                  : item.description}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.primary,
                  marginVertical: 2,
                  fontStyle: "italic",
                }}
                numberOfLines={1}
              >
                Added on {item.created_at.slice(0, 10)}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

export default BusinessCard;
