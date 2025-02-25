import RiddleCreatedLink from '@/components/common/RiddleCreatedLink';
import { Link } from 'expo-router';
import { View, ScrollView, TouchableOpacity } from 'react-native';

export default function RiddlesCreatedScreen() {
  return (
    <ScrollView className="flex-1 bg-transparent p-6">
        {Array.from({ length: 12 }, (_, i) => (
          <Link 
            key={i}
            href={`/riddles/participated/${i}`}
            asChild
          >
            <TouchableOpacity>
              <RiddleCreatedLink riddle="" />
            </TouchableOpacity>
          </Link>
        ))}
    </ScrollView>
  );
}