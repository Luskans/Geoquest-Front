import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Intro',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Connexion',
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Inscription',
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          title: 'Mot de passe oublié',
        }} 
      />
      <Stack.Screen 
        name="verify-email" 
        options={{ 
          title: 'Vérification email',
        }} 
      />
    </Stack>
  );
}