import React, { useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, useFocusEffect } from 'expo-router';
import SecondaryLayoutWithoutScrollView from '@/components/layouts/SecondaryLayoutWithoutScrollView';
import { GameSession, Review, Step, useSelectedRiddleStore } from '@/stores/useSelectedRiddleStore';
import { CollapsibleSection } from '@/components/common/CollapsibleSection';
import { Ionicons } from '@expo/vector-icons';

export default function RiddleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("Valeur de l'ID :", id);
  const { riddle, fetchRiddleData, isLoading, error } = useSelectedRiddleStore();

  useFocusEffect(
    useCallback(() => {
      fetchRiddleData({ id });
    }, [fetchRiddleData, id])
  );
  console.log(riddle);

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

  if (!riddle) {
    return (
      <SecondaryLayoutWithoutScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Aucune donnée pour cet énigme</Text>
          <Text>{id}</Text>
        </View>
      </SecondaryLayoutWithoutScrollView>
    );
  }

  return (
    <SecondaryLayoutWithoutScrollView>
      <View className='py-10 gap-4'>
        <Text className='px-6 text-xl text-dark dark:text-light'>
          {riddle.title}
        </Text>
        
        <CollapsibleSection
          title="Informations générales"
          icon="information-circle-outline"
        >
          <Text style={{ marginBottom: 6 }}>Description : {riddle.description}</Text>
          <Text>Date : {riddle.created_at.split(' ')[0]}</Text>
        </CollapsibleSection>
        
        <CollapsibleSection 
          title="Etapes"
          icon="footsteps-outline"
          number={riddle.steps ? riddle.steps.length : 0}
        >
          {riddle.steps && riddle.steps.map((step: Step) => (
            <Text key={step.id} style={{ marginBottom: 4 }}>
              Étape {step.order_number} - QR : {step.qr_code}
            </Text>
          ))}
        </CollapsibleSection>
        
        <CollapsibleSection 
          title="QR codes"
          icon="qr-code-outline"
        >
          {riddle.steps && riddle.steps.map((step: Step) => (
            <Text key={step.id} style={{ marginBottom: 4 }}>
              QR Code pour Étape {step.order_number} : {step.qr_code}
            </Text>
          ))}
        </CollapsibleSection>

        <CollapsibleSection
          title="Avis"
          icon="chatbubble-ellipses-outline"
          number={riddle.reviews ? riddle.reviews.length : 0}
        >
          {riddle.reviews && riddle.reviews.map((review: Review) => (
            <Text key={review.id} style={{ marginBottom: 4 }}>
              Avis {review.rating} : {review.content}
            </Text>
          ))}
        </CollapsibleSection>

        <CollapsibleSection 
          title="Classement"
          icon="trophy-outline"
        >
          {riddle.game_sessions && riddle.game_sessions.map((session: GameSession) => (
            <Text key={session.id} style={{ marginBottom: 4 }}>
              Classement : {session.score}
            </Text>
          ))}
        </CollapsibleSection>
      </View>
    </SecondaryLayoutWithoutScrollView>
  );
}