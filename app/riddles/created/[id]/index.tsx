import React, { useCallback } from 'react';
import { View, Text, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, useFocusEffect } from 'expo-router';
import SecondaryLayoutWithoutScrollView from '@/components/layouts/SecondaryLayoutWithoutScrollView';
import { GameSession, Review, Step, useSelectedRiddleStore } from '@/stores/useSelectedRiddleStore';
import { CollapsibleSection } from '@/components/common/CollapsibleSection';
import { getStatusColor } from '@/lib/getStatusColor';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/stores/useThemeStore';
import colors from "@/constants/colors";
import moment from 'moment';
import SecondaryLayout from '@/components/layouts/SecondaryLayout';
import GradientButton from '@/components/common/GradientButton';
import GhostButton from '@/components/common/GhostButton';

export default function CreatedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { riddle, fetchRiddleData, isLoading, error } = useSelectedRiddleStore();
  const { isDark } = useThemeStore();

  useFocusEffect(
    useCallback(() => {
      fetchRiddleData({ id });
    }, [fetchRiddleData, id])
  );
  console.log(riddle);

  if (isLoading) {
    return (
      <SecondaryLayoutWithoutScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </SecondaryLayoutWithoutScrollView>
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
        </View>
      </SecondaryLayoutWithoutScrollView>
    );
  }

  return (
    <SecondaryLayout>
      <View className='py-10 gap-4'>
        <View className='px-6 mb-8'>
          <Text
            className='text-xl text-dark dark:text-light font-semibold mb-1'
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {riddle.title}
          </Text>
          {/* <Text className='text-gray-400 dark:text-gray-400'>{ moment(riddle.created_at).format('DD-MM-YYYY') }</Text>
          <Text className='text-gray-400 dark:text-gray-400 mb-3'>Localisation</Text> */}
          {!riddle.is_private
            ? <View className='flex-row gap-3 items-center'>
                <TextInput
                  className='flex-1 bg-gray-200 text-gray-600 border rounded-lg p-2 border-gray-300'
                  value="password test"
                  editable={false}
                />
                <View className='border border-dark dark:border-light p-2 border rounded-lg'>
                  <Ionicons name="copy-outline" size={18} color={isDark ? colors.light : colors.dark } />
                </View>
              </View>
            : ''
          }
        </View>
        
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

        <Text className={`${getStatusColor(riddle.status)} w-auto self-center text-sm py-0.5 px-2.5 rounded-full mt-8`}>
          { riddle.status }
        </Text>

        <View className='px-6 flex-1 flex-row gap-3 items-center justify-center'>
          {riddle.status === "active"
          ? <GradientButton
              onPress={() => ""}
              title="Brouillon"
              colors={isDark ? [colors.primary.lighter, colors.primary.lighter] : [colors.primary.darker, colors.primary.darker]}
              textColor={isDark ? 'text-dark' : 'text-light'}
            />
          : <GradientButton
              onPress={() => ""}
              title="Publier"
              colors={isDark ? [colors.primary.lighter, colors.primary.lighter] : [colors.primary.darker, colors.primary.darker]}
              textColor={isDark ? 'text-dark' : 'text-light'}
            />
          }
          <GhostButton
            onPress={() => ""}
            title="Supprimer"
            color={isDark ? 'border-primary-lighter' : 'border-primary-darker'}
            textColor={isDark ? 'text-primary-lighter' : 'text-primary-darker'}
          />
        </View>
      </View>
    </SecondaryLayout>
  );
}