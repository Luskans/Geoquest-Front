import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function AuthScreen() {
  return (
    <View className="flex bg-white p-6">
      <View className='flex-col justify-center h-full gap-20'>
      
        {/* Header avec Logo et Nom */}
        <View className="flex-row items-center justify-center gap-2">
          <Image
            source={require('@/assets/images/logo1.png')}
            className="w-10 h-10"
          />
          <Text className="text-2xl font-bold text-gray-800">
            <Text className='text-[#DB4437]'>QR</Text>iddle
          </Text>
        </View>

        {/* Image principale */}
        <View className="items-center">
          {/* <Image
            source={require('../../assets/images/auth-image.png')}
            className="w-72 h-72"
            resizeMode="contain"
          /> */}
          <View className="w-72 h-72 bg-gray-400 rounded-lg"></View>
        </View>

        {/* BUTTONS */}
        <View className="flex gap-4">
          {/* Button google */}
          <TouchableOpacity 
            className="flex-row bg-white items-center justify-center border border-gray-300 rounded-xl py-3 px-6"
            onPress={() => {/* Handle Google OAuth */}}
          >
            <AntDesign name="google" size={24} color="#DB4437" />
            <Text className="ml-2 font-semibold">
              Continuer avec Google
            </Text>
          </TouchableOpacity>

          {/* Button apple */}
          <TouchableOpacity 
            className="flex-row bg-white items-center justify-center border border-gray-300 rounded-xl py-3 px-6"
            onPress={() => {/* Handle Apple OAuth */}}
          >
            <AntDesign name="apple1" size={24} color="#DB4437" />
            <Text className="ml-2 font-semibold">
              Continuer avec Apple
            </Text>
          </TouchableOpacity>

          {/* Separator */}
          <View className="flex-row items-center">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-500">ou</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          <View className="flex-row gap-4">
            {/* Button register */}
            <Link 
              href="/auth/register" 
              asChild
            >
              <TouchableOpacity className="flex-1 bg-secondary rounded-xl py-3">
                <Text className="text-center text-white font-semibold">
                  Inscription
                </Text>
              </TouchableOpacity>
            </Link>

            {/* Button login */}
            <Link 
              href="/auth/login" 
              asChild
            >
              <TouchableOpacity className="flex-1 bg-white border border-secondary rounded-xl py-3">
                <Text className="text-center text-secondary font-semibold">
                  Connexion
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

      </View>
    </View>
  );
}