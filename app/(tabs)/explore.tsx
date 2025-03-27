import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Types for our technical sections
interface TechnicalSection {
  title: string;
  description: string;
  features: string[];
}

// Memoized components for better performance
const FeatureList = React.memo(({ features }: { features: string[] }) => (
  <ThemedText>
    {features.map((feature, index) => (
      <React.Fragment key={index}>
        • {feature}{index < features.length - 1 ? '\n' : ''}
      </React.Fragment>
    ))}
  </ThemedText>
));

const TechnicalSection = React.memo(({ 
  title, 
  description, 
  features 
}: TechnicalSection) => (
  <Collapsible title={title}>
    <ThemedText>{description}</ThemedText>
    <FeatureList features={features} />
  </Collapsible>
));

// Memoized styles that don't depend on props
const styles = StyleSheet.create({
  headerImage: {
    bottom: -50,
    left: '50%',
    transform: [{ translateX: -155 }],
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
});

export default function TabTwoScreen() {
  // Memoize static content
  const technicalSections = useMemo<TechnicalSection[]>(() => [
    {
      title: 'State Management',
      description: 'The app uses Redux Toolkit for state management with the following features:',
      features: [
        'Async thunks for API calls with proper error handling',
        'AsyncStorage for offline data persistence',
        'Type-safe actions and state with TypeScript',
        'Optimistic updates for better UX',
        'Proper loading and error states',
      ],
    },
    {
      title: 'Navigation',
      description: 'Built with Expo Router, featuring:',
      features: [
        'File-based routing with dynamic routes',
        'Tab navigation with proper state management',
        'Type-safe navigation with proper typing',
        'Deep linking support',
        'Proper back navigation handling',
      ],
    },
    {
      title: 'API Integration',
      description: 'The app uses JSONPlaceholder API with:',
      features: [
        'Axios for HTTP requests with interceptors',
        'Network status detection using NetInfo',
        'Offline data persistence with AsyncStorage',
        'Optimistic updates for better UX',
        'Proper error handling and retry logic',
      ],
    },
    {
      title: 'UI Components',
      description: 'Custom components and styling:',
      features: [
        'Themed components for dark/light mode',
        'Reusable UI components with proper props typing',
        'Consistent styling system with StyleSheet',
        'Responsive layouts with proper spacing',
        'Loading states and animations',
        'Proper error states and feedback',
      ],
    },
    {
      title: 'TypeScript Integration',
      description: 'Full TypeScript support with:',
      features: [
        'Type-safe Redux store and actions',
        'Interface definitions for all data models',
        'Proper typing for navigation and routes',
        'Strict type checking enabled',
        'Proper error type handling',
        'Type-safe component props',
      ],
    },
    {
      title: 'Performance Optimizations',
      description: 'The app includes several performance optimizations:',
      features: [
        'Efficient list rendering with FlatList',
        'Proper pagination implementation',
        'Optimized search with debouncing',
        'Efficient state updates',
        'Proper memory management',
        'Optimized re-renders',
      ],
    },
  ], []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Technical Details</ThemedText>
      </ThemedView>
      <ThemedText>Learn more about how this app is built and its key components.</ThemedText>
      
      {technicalSections.map((section, index) => (
        <TechnicalSection
          key={section.title}
          title={section.title}
          description={section.description}
          features={section.features}
        />
      ))}
    </ParallaxScrollView>
  );
}
