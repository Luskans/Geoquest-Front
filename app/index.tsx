import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  // const isAuthenticated = useAuth();
  const isAuthenticated = true;

  return <Redirect href={isAuthenticated ? '/(tabs)/home' : '/auth'} />;
}