import ActiveGameCard from '@/components/homeScreen/ActiveGameCard';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='p-6'>
      <ActiveGameCard />
    </View>
  );
}