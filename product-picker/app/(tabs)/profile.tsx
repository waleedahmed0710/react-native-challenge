import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "@/store";
import { COLORS, FONTS } from "@/constants/theme";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.items
  );
  const getTotalPrice = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>Qty: {item.quantity}</Text>
        <Text style={styles.price}>R{item.price.toFixed(2)} each</Text>
        <Text style={styles.total}>
          Total: R{(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Grand Total: R{getTotalPrice()}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: FONTS.medium,
    fontWeight: "600",
    color: COLORS.primary,
  },
  quantity: {
    fontSize: FONTS.small,
    color: COLORS.secondary,
  },
  price: {
    fontSize: FONTS.small,
    color: COLORS.secondary,
  },
  total: {
    fontSize: FONTS.small,
    fontWeight: "600",
    color: COLORS.primary,
  },
  totalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary,
    padding: 20,
  },
  totalText: {
    fontSize: FONTS.medium,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: FONTS.small,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: FONTS.medium,
    color: COLORS.secondary,
  },
});

export default Cart;
