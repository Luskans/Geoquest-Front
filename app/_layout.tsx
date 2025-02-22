import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import "@/global.css";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { useFonts } from "expo-font";
import { ThemeProvider } from "@/stores/ThemeProvider";
import { useThemeStore } from "@/stores/useThemeStore";
import colors from "@/constants/colors";

// Maintient le splashscreen visible pendant le chargement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Pour le bg
  const theme = useTheme();
  theme.colors.background = 'transparent';
  // Pour les conditions de colors pour le ark theme
  const { isDark } = useThemeStore();
  const [loaded] = useFonts({
    'Abel': require('../assets/fonts/Abel-Regular.ttf'),
    'Cabin': require('../assets/fonts/Cabin-Variable.ttf'),
    'Lexend': require('../assets/fonts/Lexend-Variable.ttf'),
    'Mulish': require('../assets/fonts/Mulish-Variable.ttf'),
    'Nunito': require('../assets/fonts/Nunito-Variable.ttf'),
    'Playfair': require('../assets/fonts/Playfair-Variable.ttf'),
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
      {/* <ImageBackground 
        source={require('@/assets/images/bgtest.jpg')}
        className="flex-1"
        resizeMode="cover"
      > */}
      <LinearGradient
        colors={
        isDark 
            ? [colors.dark, colors.dark]
            : ["#fff", "#fff"]
        }
        className="flex-1"
      >
          <StatusBar style="auto" backgroundColor="transparent" translucent />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="game" options={{ headerShown: false }} />
            <Stack.Screen name="riddles" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false  }} />
          </Stack>
      </LinearGradient>
      {/* </ImageBackground> */}
    </ThemeProvider>
  );
}