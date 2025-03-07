import React, { useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '@/constants/colors';
import { useThemeStore } from '@/stores/useThemeStore';
import Constants from 'expo-constants';

const HEADER_HEIGHT = 220;
const statusBarHeight = Constants.statusBarHeight;

type Props = {
  children: React.ReactNode;
};

export default function PrimaryLayout({ children }: Props) {
  const [statusBarColor, setStatusBarColor] = useState<string>('transparent');
  const { isDark } = useThemeStore();

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY >= HEADER_HEIGHT - statusBarHeight - 40) {
      setStatusBarColor(isDark ? colors.primary.lighter : colors.primary.darker);
    } else {
      setStatusBarColor('transparent');
    }
  };
  
  return (
    <View className='flex-1'>
      <StatusBar style={isDark ? 'dark' : 'light'} backgroundColor={ statusBarColor } />
 
      <Image
        source={require('@/assets/images/background.webp')}
        className='absolute top-0 left-0 right-0 w-full'
        style={{ height: HEADER_HEIGHT }}
        resizeMode="cover" />
      
      <ScrollView 
        style={{ paddingTop: HEADER_HEIGHT }}
        className='bg-transparent'
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View className='flex-1 bg-white dark:bg-dark rounded-t-[40px] -mt-10'>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};