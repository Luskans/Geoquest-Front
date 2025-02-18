import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Image,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import ParallaxScrollView from '@/components/common/ParallaxScrollView';
// import colors from "@/constants/colors";


export default function LoginScreen() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation pour le shake effect en cas d'erreur
  const shakeAnimation = new Animated.Value(0);
  
  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      general: '',
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      shake();
      return;
    }

    setIsLoading(true);
    try {
      await login(formData);
      // La redirection sera gérée par le layout auth
    } catch (error) {
      shake();
      setErrors({
        ...errors,
        general: 'Email ou mot de passe incorrect',
      });
    } finally {
      setIsLoading(false);
    }
  };

return (
  <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    className="flex-1"
  >
    <ParallaxScrollView
      // headerImage={require('@/assets/images/test6.png')}
      // headerGradient={{
      //   colors: [
      //     colors.primary.mid,
      //     colors.primary.lighter,
      //   ]
      // }}
      // headerText="Connecte toi et cherche les indices !"
      headerBackground={require('@/assets/images/background.webp')}
    >
      <View className="flex-1 p-6 justify-center">

        {/* Error Message */}
        {errors.general && (
          <Animated.View 
            className="p-4 rounded-lg mb-4"
            style={{ transform: [{ translateX: shakeAnimation }] }}
          >
            <Text className="text-red-400 text-center">
              {errors.general}
            </Text>
          </Animated.View>
        )}
        
        {/* FORM */}
        <View className="flex-col gap-6">
          {/* Email Input */}
          <View>
            <Text className="text-gray-700 dark:text-gray-100 mb-2">Email</Text>
            <TextInput
              className={`bg-white border ${
                errors.email ? 'border-red-400' : 'border-gray-300'
              } rounded-lg p-3`}
              value={formData.email}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
                setErrors({ ...errors, email: '', general: '' });
              }}
              placeholder="Entrez votre email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email && (
              <Text className="text-red-400 text-sm mt-1">{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-gray-700 dark:text-gray-100 mb-2">Mot de passe</Text>
            <View className="relative">
              <TextInput
                className={`bg-white border ${
                  errors.password ? 'border-red-400' : 'border-gray-300'
                } rounded-lg p-3 pr-12`}
                value={formData.password}
                onChangeText={(text) => {
                  setFormData({ ...formData, password: text });
                  setErrors({ ...errors, password: '', general: '' });
                }}
                placeholder="Entrez votre mot de passe"
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                className="absolute right-3 top-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-red-400 text-sm mt-1">{errors.password}</Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => router.push('/auth/forgot-password')}
            className="self-end"
          >
            <Text className="text-gray-700 dark:text-gray-100">
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className={`rounded-xl py-3 ${
              isLoading ? 'bg-gray-300' : 'bg-primary-mid dark:bg-primary-lighter'
            } mt-4`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-gray-100 dark:text-dark text-center font-semibold">
                Se connecter
              </Text>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </ParallaxScrollView>
  </KeyboardAvoidingView>
);
}