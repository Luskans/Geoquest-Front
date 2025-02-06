import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';

export default function ActiveGameCard() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <View className="flex-col gap-6 bg-red-300 dark:bg-red-800 p-6 rounded-2xl">
      <Text>Une partie est en cours !</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac tortor nunc. Integer sem neque, tempor in dolor a, faucibus interdum neque.
      </Text>
      <TouchableOpacity
        className={`rounded-xl py-3 ${
          isLoading ? 'bg-secondary' : 'bg-secondary'
        }`}
        // onPress={}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Rejoindre
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}