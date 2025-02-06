import ActiveGameCard from '@/components/homeScreen/ActiveGameCard';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '@/components/common/GradientButton';

export default function HomeScreen() {
  return (
    // <LinearGradient
    //   colors={['#FCE5BB', '#BD8B9C']}
    //   className="flex-1"
    // >
      <View className='p-6 bg-transparent'>
        <ActiveGameCard />
        <GradientButton
          title="Se connecter"
          onPress={() => {}}
          colors={['#FCE5BB', '#BD8B9C']}
        />
        <View className='bg-white'>
          <Text className='font-abel text-[26px] font-normal uppercase'>Lorem ipsum blabla bllalal</Text>
          <Text className='text-[26px] uppercase'>Lorem ipsum blabla bllalal</Text>
          <Text className='font-cabin text-[26px] uppercase'>Lorem ipsum blabla bllalal</Text>
          <Text className='font-lexend text-[26px] uppercase'>Lorem ipsum blabla bllalal</Text>
          <Text className='font-mulish text-[26px] font-[400] uppercase'>Lorem ipsum blabla bllalal</Text>
          <Text className='font-nunito text-[26px] font-[400] uppercase'>Lorem ipsum blabla bllalal</Text>
        </View>
      </View>
    // </LinearGradient>
  );
}