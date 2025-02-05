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
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

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
      className="flex-1 bg-white"
    >
      <View className="flex-1 p-6">
        {/* HEADER */}
        <View className='flex-col gap-2'>
          {/* Image */}
          <View className="flex items-center">
            <View className="w-72 h-40 bg-gray-400 rounded-lg"></View>
          </View>

          {/* Baseline */}
          <View className="">
            <Text className="text-gray-600 text-center mt-2">
              Connectez vous dès maintenant !
            </Text>
          </View>
        </View>

        {/* Error Message */}
        {errors.general && (
          <Animated.View 
            className="bg-red-50 p-4 rounded-lg mb-4"
            style={{ transform: [{ translateX: shakeAnimation }] }}
          >
            <Text className="text-red-500 text-center">
              {errors.general}
            </Text>
          </Animated.View>
        )}

        {/* FORM */}
        <View className="space-y-4">
          {/* Email Input */}
          <View>
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className={`bg-gray-50 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
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
              <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-gray-700 mb-2">Mot de passe</Text>
            <View className="relative">
              <TextInput
                className={`bg-gray-50 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
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
              <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => router.push('/auth/forgot-password')}
            className="self-end"
          >
            <Text className="text-primary-600">
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className={`rounded-full py-3 ${
              isLoading ? 'bg-secondary' : 'bg-secondary'
            } mt-4`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold">
                Se connecter
              </Text>
            )}
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}