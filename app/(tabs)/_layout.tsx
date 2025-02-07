import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';

export default function TabsLayout() {
  const isAuthenticated = useAuth();

  // Redirection si non authentifié
  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          shadowColor: 'transparent',
          borderRadius: 24,
          position: 'absolute',
          bottom: -10,
          height: 64,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          elevation: 0, // Supprime l'ombre sur Android
          shadowOpacity: 0, // Supprime l'ombre sur iOS
        },
        // tabBarStyle: {
        //   position: 'absolute',
        //   bottom: 16,
        //   left: 16,
        //   right: 16,
        //   borderRadius: 24,
        //   height: 64,
        //   paddingBottom: 8,
        //   paddingTop: 8,
        //   backgroundColor: 'blue',
        //   borderTopWidth: 0,
        //   elevation: 8,
        //   shadowColor: 'green',
        //   shadowOffset: {
        //     width: 0,
        //     height: 4,
        //   },
        //   shadowOpacity: 0.1,
        //   shadowRadius: 8,
        // },
        // tabBarStyle: {
        //   position: 'absolute',
        //   bottom: -10,
        //   // left: 16,
        //   // right: 16,
        //   height: 64,
        //   borderRadius: 24,
        //   // backgroundColor: 'white',
        //   borderTopWidth: 0,
        //   elevation: 8,
        //   shadowColor: '#000',
        //   shadowOffset: {
        //     width: 0,
        //     height: 4,
        //   },
        //   shadowOpacity: 0.1,
        //   shadowRadius: 8,
        //   paddingBottom: 8,
        //   // paddingHorizontal: 16,
        // },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Carte',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Créer',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
