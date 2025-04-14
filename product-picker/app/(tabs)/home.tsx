import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Platform,
  RefreshControl,
} from 'react-native';
import ProductCard from '@/components/productcard';
import api from '@/services/api';
import { COLORS, FONTS } from '@/constants/theme';
import { useRouter, useFocusEffect } from 'expo-router';
import ErrorView from '@/components/errorview';

const { width } = Dimensions.get('screen');
const CARD_GAP = 16;
const CARD_WIDTH = (width - CARD_GAP * 3) / 2; // spacing between 2 columns + padding

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, [fetchProducts]);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [fetchProducts])
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return <ErrorView message={error} onRetry={fetchProducts} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Featured Products</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH }}>
            <ProductCard
              product={item}
              onPress={() =>
                router.push({
                  pathname: '/product_description',
                  params: {
                    product: JSON.stringify(item),
                  },
                })
              }
            />
          </View>
        )}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  header: {
    fontFamily: 'Inter-Bold',
    fontSize: FONTS.medium,
    color: COLORS.primary,
    marginBottom: 8,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: 8, android: 16 }),
    paddingBottom: 8,
  },
  emptyText: {
    fontSize: FONTS.medium,
    color: COLORS.secondary,
    textAlign: 'center',
  },
});
