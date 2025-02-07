import { LinearGradient } from 'expo-linear-gradient';
import React, { type PropsWithChildren } from 'react';
import { View, Image, type ImageSourcePropType, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useHeaderHeight } from '@react-navigation/elements';

const HEADER_HEIGHT = 300;

type Props = PropsWithChildren<{
  headerImage?: ImageSourcePropType;
  headerGradient?:  {
    colors: any;
  };
  headerText?: string;
}>;

const ParallaxScrollView = ({ children, headerImage, headerGradient, headerText }: Props) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const headerHeight = useHeaderHeight();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT / 4, 0, HEADER_HEIGHT / 4]
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingTop: HEADER_HEIGHT, minHeight: '100%' }}
      className="flex-1"
    >
      {/* Header fixe */}
      <LinearGradient
        colors={headerGradient?.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} 
        className="absolute top-0 left-0 right-0 overflow-hidden"
        style={[
          { height: HEADER_HEIGHT }
        ]}
      >
        <Animated.View 
          className='absolute top-[100px] left-0 w-full flex gap-4 items-center p-6'
          style={[
            imageAnimatedStyle
          ]}
        >
          <Image
            source={headerImage}
            className="w-24 h-24"
            resizeMode="cover"
          />
          <Text className='text-secondary-mid font-h text-xl'>{headerText}</Text>
        </Animated.View>
      </LinearGradient>

      {/* Contenu */}
      <View className="flex-1 bg-white dark:bg-black rounded-t-[40px] -mt-10">
        {children}
      </View>
    </Animated.ScrollView>
  );
};

export default ParallaxScrollView;