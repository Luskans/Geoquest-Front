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
    <View className='border rounded border-seconary-darker dark:border-secondary-lighter p-6 gap-8'>
      <Text className='text-secondary-darker dark:text-secondary-lighter text-2xl text-center'>Enigme en cours !</Text>
      <View className='flex-row items-center justify-between'>
        <View>
          <View className='flex-row items-center gap-3'>
            <Text className='text-secondary-darker dark:text-secondary-lighter text-lg'>Titre de l'enigme</Text>
            <Text className='text-secondary-darker dark:text-secondary-lighter'>xx-xx-xxxx</Text>
          </View>
          <View className='flex-row gap-4'>
            <View className='flex-row items-center gap-2'>
              <Ionicons name="star-outline" size={16} color={isDark ? colors.secondary.lighter : colors.secondary.darker } />
              <Text className='text-secondary-darker dark:text-secondary-lighter'>4.5</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <Ionicons name="trending-up-sharp" size={20} color={isDark ? colors.secondary.lighter : colors.secondary.darker } />
              <Text className='text-secondary-darker dark:text-secondary-lighter'>3</Text>
            </View>
          </View>
        </View>
        <Text className='text-secondary-darker dark:text-secondary-lighter text-lg'>4/8</Text>
      </View>
      <View className='flex-row items-center justify-center gap-6'>
        <GhostButton title="Reprendre"  onPress={() => router.push(`/game/${activeGame.id}/play`)} />
        <Text className='text-secondary-darker dark:text-secondary-lighter'>abandonner</Text>
      </View>
    </View>
  );
}