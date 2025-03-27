import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  Alert,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '@/src/store/slices/itemsSlice';
import { useRouter } from 'expo-router';
import { RootState, AppDispatch } from '@/src/store/store';
import { Item } from '@/src/store/slices/itemsSlice';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import NetInfo from '@react-native-community/netinfo';

const ITEMS_PER_PAGE = 10;

// Memoized styles that don't depend on props
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mainContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  searchContainer: {
    marginTop: 8,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  footer: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 40,
    width: '100%',
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 16,
    maxWidth: 400,
    alignSelf: 'center',
  },
  paginationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  previousButton: {
    backgroundColor: '#000',
  },
  nextButton: {
    backgroundColor: '#000',
  },
  paginationButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paginationButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  paginationButtonTextDisabled: {
    color: '#666',
  },
  paginationText: {
    fontSize: 14,
    color: '#666',
  },
  createButton: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Memoized components for better performance
const ListItem = React.memo(({ item, onPress }: { item: Item; onPress: () => void }) => (
  <TouchableOpacity style={baseStyles.item} onPress={onPress}>
    <Text style={baseStyles.title}>{item.title}</Text>
    <Text style={baseStyles.body} numberOfLines={2}>
      {item.body}
    </Text>
  </TouchableOpacity>
));

const PaginationButton = React.memo(({ 
  onPress, 
  disabled, 
  text, 
  style 
}: { 
  onPress: () => void; 
  disabled: boolean; 
  text: string;
  style?: ViewStyle;
}) => (
  <TouchableOpacity 
    style={[
      baseStyles.paginationButton, 
      style, 
      disabled && baseStyles.paginationButtonDisabled
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[
      baseStyles.paginationButtonText, 
      disabled && baseStyles.paginationButtonTextDisabled
    ]}>
      {text}
    </Text>
  </TouchableOpacity>
));

export default function PostsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { items, loading, error } = useSelector((state: RootState) => state.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    const filtered = items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery)
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [items, searchQuery]);

  const onRefresh = useCallback(async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
      return;
    }
    dispatch(fetchItems());
  }, [dispatch]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ), [filteredItems, currentPage]);

  const renderItem = useCallback(({ item }: { item: Item }) => (
    <ListItem 
      item={item}
      onPress={() => router.push(`/posts/${item.id}`)}
    />
  ), [router]);

  const renderPagination = useCallback(() => {
    if (totalPages <= 1) return null;

    return (
      <View style={baseStyles.paginationContainer}>
        <PaginationButton
          onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          text="Previous"
          style={baseStyles.previousButton}
        />
        
        <Text style={baseStyles.paginationText}>
          Page {currentPage} of {totalPages}
        </Text>

        <PaginationButton
          onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          text="Next"
          style={baseStyles.nextButton}
        />
      </View>
    );
  }, [currentPage, totalPages]);

  const ListEmptyComponent = useMemo(() => (
    loading ? (
      <ActivityIndicator size="large" color="#f4511e" />
    ) : (
      <Text style={baseStyles.emptyText}>No items found</Text>
    )
  ), [loading]);

  if (error) {
    return (
      <View style={baseStyles.centerContainer}>
        <Text style={baseStyles.errorText}>Error: {error.message}</Text>
        <TouchableOpacity style={baseStyles.retryButton} onPress={onRefresh}>
          <Text style={baseStyles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={baseStyles.container}>
      <View style={baseStyles.header}>
        <Text style={baseStyles.headerTitle}>Posts</Text>
        <View style={baseStyles.searchContainer}>
          <TextInput
            style={[baseStyles.searchInput, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
            placeholder="Search by title or ID..."
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <View style={baseStyles.mainContent}>
        <FlatList
          data={paginatedItems}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`}
          refreshControl={
            <RefreshControl 
              refreshing={loading} 
              onRefresh={onRefresh}
              testID="refresh-control"
            />
          }
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={baseStyles.listContent}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={10}
          testID="posts-list"
        />
        <TouchableOpacity 
          style={[baseStyles.createButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={() => router.push('/posts/new')}
        >
          <Text style={baseStyles.createButtonText}>Create Post</Text>
        </TouchableOpacity>
        <View style={baseStyles.footer}>
          {renderPagination()}
        </View>
      </View>
    </SafeAreaView>
  );
} 