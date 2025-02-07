import { useThemeStore } from '@/stores/useThemeStore';
import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const theme = useTheme();
  const { isDark } = useThemeStore();
  theme.colors.background = 'transparent';

  return (
    
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'transparent' },
        headerTransparent: true,
        headerBlurEffect: undefined,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
        headerTintColor: `${isDark ? 'white' : 'black'}`
      }}
    >      
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