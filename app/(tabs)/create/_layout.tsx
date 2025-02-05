import { Stack } from 'expo-router';

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Mes parties",
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="new" 
        options={{ 
          title: "Nouvelle partie"
        }} 
      />
    </Stack>
  );
}