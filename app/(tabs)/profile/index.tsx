import { ThemeToggle } from '@/components/common/ThemeToggle';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View>
      <Text className='text-green-400 dark:text-blue-400'>Page Profil</Text>
      <ThemeToggle />
    </View>
  );
}