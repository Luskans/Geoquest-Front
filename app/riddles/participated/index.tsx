import RiddleParticipatedLink from '@/components/common/RiddleParticipatedLink';
import { Link, useFocusEffect } from 'expo-router';
import { View, ScrollView, TouchableOpacity, FlatList, Text, ActivityIndicator } from 'react-native';
import { useCallback } from 'react';
import { useParticipatedRiddlesStore, Riddle } from '@/stores/useParticipatedRiddlesStore';

export default function RiddlesParticipatedScreen() {
  const { riddles, fetchRiddles, isLoading } = useParticipatedRiddlesStore();

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchRiddles();
  //   }, [fetchRiddles])
  // );

  if (isLoading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

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
  // return (
  //   <View style={{ flex: 1, padding: 16 }}>
  //     <FlatList
  //       data={riddles}
  //       keyExtractor={(item: Riddle) => item.id.toString()}
  //       renderItem={({ item }: { item: Riddle }) => (
  //         <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ccc' }}>
  //           <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
  //           <Text>{item.description}</Text>
  //         </View>
  //       )}
  //     />
  //   </View>
  // );
}