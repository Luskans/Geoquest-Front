import { useAuthStore } from '@/stores/useAuthStore';
import { Redirect } from 'expo-router';

export default function Index() {
  // const isAuthenticated = false;
  const { isAuthenticated, isLoading } = useAuthStore();
  

  return <Redirect href={isAuthenticated ? '/(tabs)/home' : '/auth'} />;
}