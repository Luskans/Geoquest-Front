import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/stores/useThemeStore';
import colors from "@/constants/colors";
import { router } from 'expo-router';
import GhostButton from '../common/GhostButton';

type ActiveGameCardProps = {
  activeGame: any;
};

export default function ActiveGameCard({ activeGame }: ActiveGameCardProps) {
  const { isDark } = useThemeStore();

  const handleResume = () => {
    router.push(`/game/${activeGame.id}/play`);
  };

  const handleAbandon = () => {
    // Logique pour abandonner la partie
  };
  
  return (
    <View className='p-6 gap-8'>
      <Text className='text-secondary-darker dark:text-secondary-lighter text-2xl text-center font-semibold uppercase'>Enigme en cours !</Text>
      <View className='flex-row items-center justify-between'>
        <View>
          <View className='flex-row items-center gap-3'>
            <Text className='text-dark dark:text-light text-lg'>Titre de l'enigme</Text>
            <Text className='text-gray-400 dark:text-gray-400'>xx-xx-xxxx</Text>
          </View>
          <View className='flex-row gap-4'>
            <View className='flex-row items-center gap-2'>
              <Ionicons name="star-outline" size={16} color={isDark ? colors.secondary.lighter : colors.secondary.darker } />
              <Text className='text-dark dark:text-light'>4.5</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <Ionicons name="trending-up-sharp" size={20} color={isDark ? colors.secondary.lighter : colors.secondary.darker } />
              <Text className='text-dark dark:text-light'>3</Text>
            </View>
          </View>
        </View>
        <Text className='text-secondary-darker dark:text-secondary-lighter text-lg'>4/8</Text>
      </View>
      <View className='flex-row items-center gap-6'>
        <GhostButton title="Reprendre" color={isDark ? 'border-secondary-lighter' : 'border-secondary-darker'} textColor={isDark ? 'text-secondary-lighter' : 'text-secondary-darker'} onPress={() => router.push(`/game/${activeGame.id}/play`)} />
        <Text className='px-6 py-3 justify-center text-dark dark:text-light underline'>Abandonner</Text>
      </View>
    </View>
  );
}