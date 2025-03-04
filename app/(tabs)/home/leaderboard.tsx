import Leaderboard from '@/components/homeScreen/Leaderboard';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useLeaderboardStore } from '@/stores/useLeaderboardStore';
import React, { useCallback, useEffect, useState } from 'react';



export default function LeaderboardScreen() {
  const [activePeriod, setActivePeriod] = useState<Period>('week');
  const [offset, setOffset] = useState<number>(0);
  const { ranking, fetchLeaderboardData, isLoading } = useLeaderboardStore();
  const limit = 20; // par exemple, on charge 20 éléments par page

  return (
    <View>
      <Text>Page de leaderboard</Text>
      <Leaderboard />
    </View>
  );
}