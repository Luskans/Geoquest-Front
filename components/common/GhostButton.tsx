import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface GhostButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function GhostButton({
  onPress,
  title,
  isLoading = false,
  disabled = false,
}: GhostButtonProps) {

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      className="overflow-hidden"
    >
      <View className={`px-6 py-3 w-full items-center justify-center bg-secondary-darker dark:bg-secondary-lighter rounded-lg ${disabled ? 'opacity-50' : ''}`} >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className={`text-light dark:text-dark font-semibold`}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}