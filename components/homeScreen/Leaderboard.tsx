import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

type LeaderboardData = {
  id: string;
  rank: number;
  username: string;
  profilePic: string;
  score: number;
};

type Period = 'week' | 'month' | 'total';

type LeaderboardProps = {
  weeklyData: LeaderboardData[];
  monthlyData: LeaderboardData[];
  totalData: LeaderboardData[];
};

const TabButton = ({ 
  title, 
  isActive, 
  onPress 
}: { 
  title: string; 
  isActive: boolean; 
  onPress: () => void; 
}) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-1 px-4"
    >
        <View className="items-center">
            <Text
                className={`text-center font-medium py-3 ${
                    isActive ? "text-secondary-mid dark:text-secondary-lighter" : "text-gray-mid dark:text-gray-400"
                }`}
            >
                {title}
            </Text>
            {isActive && (
                <View className=" w-14 h-0.5 bg-secondary-mid dark:bg-secondary-lighter" />
            )}
        </View>
    </TouchableOpacity>
);

const LeaderboardRow = ({ data, index }: { data: LeaderboardData; index: number }) => {
  // Couleurs pour les 3 premiers
  const rankColors: any = {
    0: "bg-yellow-500",
    1: "bg-gray-400",
    2: "bg-amber-600",
  };

  return (
    <View className="flex-row items-center py-3">
      {/* Rank */}
      <View className="w-12 items-center">
        <View 
          className={`w-8 h-8 rounded-full items-center justify-center ${
            index < 3 ? rankColors[index] : "bg-gray-100"
          }`}
        >
          <Text 
            className={`font-bold ${
              index < 3 ? "text-white" : "text-gray-600"
            }`}
          >
            {data.rank}
          </Text>
        </View>
      </View>

      {/* User Info */}
      <View className="flex-1 flex-row items-center">
        <Image
          source={{ uri: data.profilePic }}
          className="w-10 h-10 rounded-full"
        />
        <Text className="ml-3 font-medium text-gray-800 dark:text-light" numberOfLines={1} ellipsizeMode="tail">
          {data.username}
        </Text>
      </View>

      {/* Score */}
      <View className="w-20">
        <Text className="text-right font-bold text-gray-800 dark:text-light">
          {data.score}
        </Text>
      </View>
    </View>
  );
};

export default function Leaderboard({ 
  weeklyData, 
  monthlyData, 
  totalData 
}: LeaderboardProps) {
  const [activePeriod, setActivePeriod] = useState<Period>('week');

  const getData = () => {
    switch (activePeriod) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'total':
        return totalData;
    }
  };

  return (
    <View className="mt-4">
      {/* Tabs */}
      <View className="">
        <View className="flex-row justify-between bg-gray-100 dark:bg-[#444444] rounded-full">
          <TabButton
            title="Semaine"
            isActive={activePeriod === 'week'}
            onPress={() => setActivePeriod('week')}
          />
          <TabButton
            title="Mois"
            isActive={activePeriod === 'month'}
            onPress={() => setActivePeriod('month')}
          />
          <TabButton
            title="Total"
            isActive={activePeriod === 'total'}
            onPress={() => setActivePeriod('total')}
          />
        </View>
      </View>

      {/* Header */}
      <View className="flex-row justify-between mt-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <Text className="italic w-12 text-center text-gray-500 dark:text-gray-400 text-sm">Rang</Text>
        <Text className="italic text-gray-500 dark:text-gray-400 text-sm">Joueur</Text>
        <Text className="italic w-20 text-right text-gray-500 dark:text-gray-400 text-sm">Score</Text>
      </View>

      {/* List */}
      <ScrollView className="max-h-80">
        {getData().map((item, index) => (
          <LeaderboardRow
            key={item.id}
            data={item}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}
