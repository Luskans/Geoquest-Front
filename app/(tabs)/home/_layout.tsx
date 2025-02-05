import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Accueil",
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="leaderboard" 
        options={{ 
          title: "Classement"
        }} 
      />
    </Stack>
  );
}