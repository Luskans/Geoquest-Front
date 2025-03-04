import RiddleCreatedLink from '@/components/common/RiddleCreatedLink';
import { Link, useFocusEffect } from 'expo-router';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Text } from 'react-native';
import { useCallback } from 'react';
import { useCreatedRiddlesStore, Riddle } from '@/stores/useCreatedRiddlesStore';

export default function RiddlesCreatedScreen() {
  const { riddles, fetchRiddles, isLoading } = useCreatedRiddlesStore();

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