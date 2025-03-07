import Leaderboard from '@/components/leaderboard/Leaderboard';
import { View, ActivityIndicator } from 'react-native';
import { useLeaderboardStore } from '@/stores/useLeaderboardStore';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import SecondaryLayoutWithoutScrollView from '@/components/layouts/SecondaryLayoutWithoutScrollView';


export default function LeaderboardScreen() {
  const { ranking, userRank, offset, fetchLeaderboardData, isLoading, error, resetLeaderboardData } = useLeaderboardStore();

  useFocusEffect(
    useCallback(() => {
      resetLeaderboardData();
      fetchLeaderboardData({ limit: 20, offset: 0 });
    }, [fetchLeaderboardData, resetLeaderboardData])
  );

  const handleLoadMore = async () => {
    if (!isLoading) {
      await fetchLeaderboardData({ limit: 20, offset });
    }
  };

  if (isLoading && offset === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <SecondaryLayoutWithoutScrollView>
      <View className='flex-1 pb-20 px-6'>
        <Leaderboard
          ranking={ranking}
          userRank={userRank}
          infiniteScroll={true}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoading}
        />
      </View>
    </SecondaryLayoutWithoutScrollView>
  );
}