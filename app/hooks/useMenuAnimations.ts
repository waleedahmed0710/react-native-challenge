import { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { MenuItem } from '@/app/types/menu';

export default function useMenuAnimations(isVisible: boolean, menuItems: MenuItem[]) {
  const [animation] = useState(new Animated.Value(0));
  const [opacityAnimation] = useState(new Animated.Value(0));
  const menuItemAnimations = useRef(menuItems.map(() => new Animated.Value(0)));

  useEffect(() => {
    if (isVisible) {
      animation.setValue(0);
      opacityAnimation.setValue(0);
      menuItemAnimations.current.forEach(anim => anim.setValue(0));

      Animated.parallel([
        Animated.spring(animation, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      Animated.stagger(
        50,
        menuItemAnimations.current.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            friction: 8,
            tension: 50,
            useNativeDriver: true,
          }),
        ),
      ).start();
    } else {
      Animated.stagger(
        50,
        [...menuItemAnimations.current].reverse().map(anim =>
          Animated.spring(anim, {
            toValue: 0,
            friction: 8,
            tension: 50,
            useNativeDriver: true,
          }),
        ),
      ).start();

      Animated.sequence([
        Animated.delay(50),
        Animated.parallel([
          Animated.spring(animation, {
            toValue: 0,
            friction: 7,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 0,
            duration: 250,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [isVisible, animation, opacityAnimation]);

  return {
    animation,
    opacityAnimation,
    menuItemAnimations: menuItemAnimations.current,
  };
}
