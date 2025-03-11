import { Link, useFocusEffect } from 'expo-router';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useCallback } from 'react';
import SecondaryLayoutWithoutScrollView from '@/components/layouts/SecondaryLayoutWithoutScrollView';
import CreatedListCard from '@/components/list/CreatedListCard';
import { useCreatedRiddleStore } from '@/stores/useCreatedRiddleStore';

export default function RiddlesCreatedScreen() {
  const {
    offset,
    hasMore,
    riddles,
    fetchRiddlesData,
    resetRiddles,
    isLoading,
    error
  } = useCreatedRiddleStore();

  useFocusEffect(
    useCallback(() => {
      resetRiddles();
      fetchRiddlesData({ limit: 20, offset: 0 });
    }, [fetchRiddlesData, resetRiddles])
  );

  const handleLoadMore = async () => {
    if (!isLoading && hasMore) {
      await fetchRiddlesData({ limit: 20, offset });
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <>
      <Link href={`/riddles/created/${item.id}`} className='py-6' asChild>
        <TouchableOpacity className=''>
          <CreatedListCard riddle={item} />
        </TouchableOpacity>
      </Link>
      <View className='bg-gray-100 dark:bg-gray-darker h-2'></View>
    </>
  );

  if (isLoading && offset === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <SecondaryLayoutWithoutScrollView>
      <View className='flex-1 py-10 gap-6'>
        <FlatList
          data={riddles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size="large" color="#2563EB" className='mt-4' />
            ) : null
          }
        />
      </View>
    </SecondaryLayoutWithoutScrollView>
  );
}