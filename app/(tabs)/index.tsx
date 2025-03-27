import React, { useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Memoized components for better performance
const FeatureList = React.memo(({ items }: { items: string[] }) => (
  <ThemedView style={styles.featureList}>
    {items.map((item, index) => (
      <ThemedText key={index}>• {item}</ThemedText>
    ))}
  </ThemedView>
));

const StepContainer = React.memo(({ 
  title, 
  description, 
  features 
}: { 
  title: string; 
  description?: string;
  features: string[];
}) => (
  <ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">{title}</ThemedText>
    {description && <ThemedText>{description}</ThemedText>}
    <FeatureList items={features} />
  </ThemedView>
));

// Memoized styles that don't depend on props
const styles = StyleSheet.create({
  reactLogo: {
    height: 250,
    width: '100%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  stepContainer: {
    marginTop: 24,
    gap: 8,
  },
  featureList: {
    marginTop: 8,
    gap: 4,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default function HomeScreen() {
  // Memoize static content
  const aboutFeatures = useMemo(() => [
    'Multi-screen navigation with Expo Router',
    'Redux state management with AsyncStorage persistence',
    'CRUD operations for posts with offline support',
    'Search and pagination functionality',
    'Network connectivity handling',
    'Responsive UI with dark/light mode',
  ], []);

  const gettingStartedFeatures = useMemo(() => [
    'View posts with pagination (10 posts per page)',
    'Search posts by title or ID',
    'Create new posts with the floating action button',
    'Edit and delete existing posts',
    'Pull-to-refresh to update posts',
    'Offline access to previously loaded posts',
  ], []);

  const keyFeatures = useMemo(() => [
    'Real-time search filtering',
    'Pagination with Previous/Next navigation',
    'Network status detection and alerts',
    'Persistent data storage with AsyncStorage',
    'Error handling with retry options',
    'Loading states and animations',
  ], []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to DevRn!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <StepContainer
        title="About the App"
        description="DevRn is a modern React Native application that demonstrates advanced features including:"
        features={aboutFeatures}
      />
      
      <StepContainer
        title="Getting Started"
        description="Navigate to the Posts tab to explore the app's features:"
        features={gettingStartedFeatures}
      />
      
      <StepContainer
        title="Key Features"
        features={keyFeatures}
      />
      
      <ThemedView style={styles.bottomSpacer} />
    </ParallaxScrollView>
  );
}
