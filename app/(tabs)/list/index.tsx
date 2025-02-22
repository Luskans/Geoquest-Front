import ModuleLink from '@/components/common/ModuleLink';
import { Link } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';

export default function RiddleScreen() {

  return (
    <View className='p-6 mt-20 gap-6'>
      <Link href="/riddles/participated" asChild>
        <TouchableOpacity>
          <ModuleLink title="Enigmes participées" number={18} />
        </TouchableOpacity>
      </Link>

      <Link href="/riddles/created" asChild>
        <TouchableOpacity>
          <ModuleLink title="Enigmes créées" number={7} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}