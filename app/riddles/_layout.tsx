import { useThemeStore } from '@/stores/useThemeStore';
import { Stack } from 'expo-router';
import colors from "@/constants/colors";

export default function RiddlesLayout() {
  const { isDark } = useThemeStore();
  
  return (
    // <Stack
    //   screenOptions={{
    //     contentStyle: { backgroundColor: 'transparent' },
    //     headerStyle: { backgroundColor: 'transparent' },
    //     headerShadowVisible: false,
    //     headerTintColor: isDark ? colors.light : colors.dark,
    //     animation: 'slide_from_right'
    //   }}
    // >
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen 
        name="created/index"
        options={{ 
          title: 'Mes créations',
        }}
      />
      <Stack.Screen 
        name="created/[id]/index"
        options={{ 
          title: '',
        }}
      />
      <Stack.Screen 
        name="created/[id]/steps/[id]"
        options={{ 
          title: '',
        }}
      />
      <Stack.Screen 
        name="created/[id]/qrcodes/[id]"
        options={{ 
          title: '',
        }}
      />
      <Stack.Screen 
        name="participated/index"
        options={{ 
          title: 'Mes participations',
        }}
      />
      <Stack.Screen 
        name="participated/[id]"
        options={{ 
          title: '',
        }}
      />
    </Stack>
  );
}