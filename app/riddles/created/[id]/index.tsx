import React, { useCallback, useEffect } from 'react';
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
import { useRiddleStore } from '@/stores/useRiddleStore';
import { useStepStore } from '@/stores/useStepStore';
import { useReviewStore } from '@/stores/useReviewStore';
import { useLeaderboardStore } from '@/stores/useLeaderboardStore';
import UpdateForm from '@/components/riddleDetail/UpdateForm';
import StepList from '@/components/riddleDetail/StepList';
import QrCodeList from '@/components/riddleDetail/QrCodeList';

export default function CreatedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // const { riddleDetail, updateRiddle, deleteRiddle, fetchRiddleDetail } = useRiddleStore();
  const { stepList, fetchStepList } = useStepStore();
  // const { reviewList, fetchReviewList } = useReviewStore();
  // const { gameLeaderboard, fetchGameLeaderboard } = useLeaderboardStore();
  const { isDark } = useThemeStore();

  useFocusEffect(
    useCallback(() => {
      if (id) {
        // fetchRiddleDetail(id);
        fetchStepList(id);
        // fetchReviewList(id);
        // fetchRiddleLeaderboard(id);
      }
    }, [id, fetchStepList])
  );
  console.log("step list", stepList)
  // const renderMainButton = () => {
  //   const status = riddleDetail.riddle?.status;

  //   if (status === 'active') {
  //     return (
  //       <GradientButton
  //         onPress={() => updateRiddle(id, { status: 'draft' })}
  //         title="Dépublier"
  //         colors={isDark ? [colors.primary.lighter, colors.primary.lighter] : [colors.primary.darker, colors.primary.darker]}
  //         textColor={isDark ? 'text-dark' : 'text-light'}
  //       />
  //     );
  //   } else if (status === 'draft') {
  //     return (
  //       <GradientButton
  //         onPress={() => updateRiddle(id, { status: 'active' })}
  //         title="Publier"
  //         colors={isDark ? [colors.primary.lighter, colors.primary.lighter] : [colors.primary.darker, colors.primary.darker]}
  //         textColor={isDark ? 'text-dark' : 'text-light'}
  //       />
  //     );
  //   } else {
  //     return (
  //       <GradientButton
  //         onPress={() => updateRiddle(id, { status: 'active' })}
  //         title="Vérifier"
  //         colors={isDark ? [colors.primary.lighter, colors.primary.lighter] : [colors.primary.darker, colors.primary.darker]}
  //         textColor={isDark ? 'text-dark' : 'text-light'}
  //       />
  //     );
  //   }
  // };

  const handleDelete = () => {
    // Ajouter une confirmation avant de supprimer ?
    // Alert.alert("Confirmation", "Voulez-vous vraiment supprimer cette énigme ?", [ { text: "Annuler" }, { text: "Supprimer", onPress: () => deleteRiddle(riddleId) } ]);
    console.log("Suppression de l'énigme :", id);
    // deleteRiddle(id);
    // Peut-être naviguer en arrière après suppression ? router.back();
  };

  return (
    <SecondaryLayout>
      <View className='py-10 gap-4'>
        {/* <View className='px-6 mb-8'>
          <Text
            className='text-xl text-dark dark:text-light font-semibold mb-1'
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {riddleDetail.riddle.title}
          </Text>
          {riddleDetail.riddle.is_private
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
        </View> */}
        
        <CollapsibleSection
          title="Informations générales"
          icon="information-circle-outline"
        >
          <UpdateForm />
        </CollapsibleSection>
        
        <CollapsibleSection 
          title="Etapes"
          icon="footsteps-outline"
          number={stepList.steps.length}
        >
          <StepList stepList={stepList} />
        </CollapsibleSection>
        
        <CollapsibleSection 
          title="QR codes"
          icon="qr-code-outline"
        >
          <QrCodeList stepList={stepList} />
        </CollapsibleSection>

        {/* <CollapsibleSection
          title="Avis"
          icon="chatbubble-ellipses-outline"
          number={reviewList.reviews.length}
        >
          {reviewList.reviews.map((review: Review) => (
            <View key={review.id} style={{ marginBottom: 4 }}>
              <View>Photo, auteur name, date</View>
              <Text>
                Avis {review.rating} : {review.content}
              </Text>
            </View>
          ))}
        </CollapsibleSection> */}

        {/* <CollapsibleSection 
          title="Classement"
          icon="trophy-outline"
        >
          {gameLeaderboard.leaderboard.map((session: GameSession) => (
            <Text key={session.id} style={{ marginBottom: 4 }}>
              Classement : {session.score}
            </Text>
          ))}
        </CollapsibleSection> */}

        {/* <Text className={`${getStatusColor(riddleDetail.riddle.status)} w-auto self-center text-sm py-0.5 px-2.5 rounded-full mt-8`}>
          { riddleDetail.riddle.status }
        </Text> */}

        <View className='px-6 flex-1 flex-row gap-3 items-center justify-center'>
          {/* {renderMainButton()} */}

          <GhostButton
            onPress={handleDelete}
            title="Supprimer"
            color={isDark ? 'border-primary-lighter' : 'border-primary-darker'}
            textColor={isDark ? 'text-primary-lighter' : 'text-primary-darker'}
          />
        </View>
      </View>
    </SecondaryLayout>
  );
}