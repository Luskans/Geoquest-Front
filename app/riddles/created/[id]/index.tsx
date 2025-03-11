import React, { useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, useFocusEffect } from 'expo-router';
import SecondaryLayoutWithoutScrollView from '@/components/layouts/SecondaryLayoutWithoutScrollView';
import { useSelectedRiddleStore } from '@/stores/useSelectedRiddleStore';

export default function RiddleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    riddle,
    fetchRiddleData,
    isLoading,
    error
  } = useSelectedRiddleStore();

  useFocusEffect(
    useCallback(() => {
      fetchRiddleData({ id: id });
    }, [fetchRiddleData])
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (error) {
    return (
      <SecondaryLayoutWithoutScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      </SecondaryLayoutWithoutScrollView>
    );
  }

  return (
    <SecondaryLayoutWithoutScrollView>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {riddle.title}
        </Text>
        <Text style={{ fontSize: 16, color: '#555', marginBottom: 10 }}>
          {riddle.description}
        </Text>
        {/* Affichez ici d'autres informations (date, statut, etc.) */}
      </View>
    </SecondaryLayoutWithoutScrollView>
  );
}