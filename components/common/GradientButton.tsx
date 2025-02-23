import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface GradientButtonProps {
  onPress: () => void;
  title: string;
  colors?: any;
  isLoading?: boolean;
  isDisabled?: boolean;
}

function GradientButton({
  onPress,
  title,
  colors,
  isLoading = false,
  isDisabled = false,
}: GradientButtonProps) {

  const disabled = isLoading || isDisabled;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className="overflow-hidden mt-8"
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className={`px-6 py-3 w-full items-center justify-center ${disabled ? 'opacity-50' : ''}`}
        style={{ borderRadius: 8 }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className={`text-white font-semibold`} numberOfLines={1}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default memo(GradientButton);