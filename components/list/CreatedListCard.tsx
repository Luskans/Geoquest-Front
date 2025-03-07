import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from '@/stores/useThemeStore';
import colors from "@/constants/colors";
import moment from "moment";

interface CreatedListCardProps {
    riddle: any;
}

export default function CreatedListCard({ riddle }: CreatedListCardProps) {
    const { isDark } = useThemeStore();
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case "active": return 'bg-secondary-darker text-light dark:bg-secondary-lighter dark:text-dark';
        case "draft": return 'bg-gray-300 text-dark dark:bg-gray-300 dark:text-dark';
        case "disabled": return 'bg-red-200 text-dark dark:bg-red-300 dark:text-dark';
        default: return 'bg-gray-300 text-dark';
      }
    };

    return (
      <View className='flex-1 flex-row justify-between items-center px-6 gap-8'>
        <View className='flex-1 flex-col'>
          <View className='flex-row items-center gap-3'>
            { riddle.is_private
              ? <Ionicons name="lock-closed-outline" size={16} color={isDark ? colors.light : colors.dark } />
              : ''
            }
            <Text
              className='text-dark dark:text-light text-lg'
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              { riddle.title }
            </Text>
          </View>

          <View className=''>
            <Text className='text-gray-400 dark:text-gray-400 text-sm'>{ moment(riddle.created_at).format('DD-MM-YYYY') }</Text>
          </View>

          <View className=''>
            <Text className='text-gray-400 dark:text-gray-400 text-sm'>Localisation</Text>
          </View>
        </View>

        <View className='flex-row gap-2'>
          <Text className={`${getStatusColor(riddle.status)} text-sm py-0.5 px-2.5 rounded-full`}>
            { riddle.status }
          </Text>
          <Ionicons name="caret-forward" size={20} color={isDark ? colors.light : colors.dark } />
        </View>
      </View>
    );
}