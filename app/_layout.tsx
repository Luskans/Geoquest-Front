import { Stack } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import "@/global.css";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { useFonts } from "expo-font";
import { ThemeProvider } from "@/stores/ThemeProvider";


// Maintient le splashscreen visible pendant le chargement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useTheme();
  theme.colors.background = 'transparent';
  const [loaded] = useFonts({
    'Abel': require('../assets/fonts/Abel-Regular.ttf'),
    'Cabin': require('../assets/fonts/Cabin-Variable.ttf'),
    'Lexend': require('../assets/fonts/Lexend-Variable.ttf'),
    'Mulish': require('../assets/fonts/Mulish-Variable.ttf'),
    'Nunito': require('../assets/fonts/Nunito-Variable.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <ImageBackground 
        source={require('@/assets/images/bgtest.jpg')}
        className="flex-1"
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }} >
          <StatusBar style="auto" backgroundColor="transparent" translucent />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' }
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="game" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false  }} />
          </Stack>
        </SafeAreaView>
      </ImageBackground>
    </ThemeProvider>
  );
}

{/* <LinearGradient
    colors={
    colorScheme === 'dark' 
        ? ['secondary', '#1A1A1A'] // Couleurs pour le thème sombre
        : ['secondary', '#BD8B9C']  // Couleurs pour le thème clair
    }
    className="flex-1"
>
</LinearGradient> */}