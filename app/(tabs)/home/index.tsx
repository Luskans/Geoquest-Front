import { View, Text } from 'react-native';
import ParallaxScrollView from '@/components/common/ParallaxScrollView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/stores/useThemeStore';
import colors from "@/constants/colors";
import GhostButton from '@/components/common/GhostButton';


export default function HomeScreen() {
  const { isDark } = useThemeStore();
  
  return (
    <ParallaxScrollView
      headerBackground={require('@/assets/images/background.webp')}
    >
      <View className='p-6 bg-transparent gap-8'>
        {/* NOTIFICATIONS */}
        <View className='flex gap-2'>
          <View className='flex-row items-center gap-3'>
            <Text className='dark:text-light text-2xl'>Notifications</Text>
            <Ionicons name="arrow-forward" size={24} color={isDark ? colors.light : colors.dark } />
          </View>
          <Text className='dark:text-light text-lg'>Vous avez x notifications en attente.</Text>
        </View>

        {/* CURRENT RIDDLE */}
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
            <GhostButton title="Reprendre" onPress={() => {}}/>
            <Text className='text-secondary-darker dark:text-secondary-lighter'>abandonner</Text>
          </View>
        </View>

        {/* RIDDLES PARTICIPATED */}
        <View className='flex-row items-center justify-between'>
          <Text className='text-dark dark:text-light text-lg'>Enigmes participées</Text>
          <View className='flex-row gap-2'>
            <Text className='text-dark dark:text-light text-lg'>18</Text>
            <Ionicons name="caret-forward" size={20} color={isDark ? colors.light : colors.dark } />
          </View>
        </View>

        {/* RIDDLES CREATED */}
        <View className='flex-row items-center justify-between'>
          <Text className='text-dark dark:text-light text-lg'>Enigmes créées</Text>
          <View className='flex-row gap-2'>
            <Text className='text-dark dark:text-light text-lg'>7</Text>
            <Ionicons name="caret-forward" size={20} color={isDark ? colors.light : colors.dark } />
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}