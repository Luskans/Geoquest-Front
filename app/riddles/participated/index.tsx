import RiddleParticipatedLink from '@/components/common/RiddleParticipatedLink';
import { Link } from 'expo-router';
import { View, ScrollView, TouchableOpacity } from 'react-native';

export default function RiddlesParticipatedScreen() {
  return (
    <ScrollView className="flex-1 bg-transparent p-6">
        {Array.from({ length: 5 }, (_, i) => (
          <Link 
            key={i}
            href={`/riddles/participated/${i}`}
            asChild
          >
            <TouchableOpacity>
              <RiddleParticipatedLink riddle="" />
            </TouchableOpacity>
          </Link>
        ))}
    </ScrollView>
  );
}