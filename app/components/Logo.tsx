import React from 'react';
import { View, Image } from 'react-native';
import { LogoProps } from '@/app/types/components';
import styles from '@/app/styles/logo.styles';

export default function Logo({ size = 'medium' }: LogoProps) {
  const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;

  const baseSize = 40;
  const logoSize = baseSize * sizeMultiplier;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        resizeMode="contain"
      />
    </View>
  );
}
