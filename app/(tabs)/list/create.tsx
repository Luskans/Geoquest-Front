import SecondaryLayout from '@/components/layouts/SecondaryLayout';
import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import Slider from '@react-native-community/slider';
import { FormField } from '@/components/common/FormField';
import { riddleSchema } from '@/lib/validationSchemas';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import GradientButton from '@/components/common/GradientButton';
import { useThemeStore } from '@/stores/useThemeStore';
import colors from '@/constants/colors';
import { DESCRIPTION_MAX_LENGTH } from '@/constants/constants';



export default function CreateScreen() {
  const { isDark } = useThemeStore();
  const [descriptionLength, setDescriptionLength] = useState(0);
  // const [mapCoordinate, setMapCoordinate] = useState({ latitude: 45.041446, longitude: 3.883930 });
  // Par défaut, on affiche la carte centrée sur une position par défaut
  const [mapCoordinate, setMapCoordinate] = useState({
    latitude: 45.041446,
    longitude: 3.883930,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Handler pour la sélection de l'emplacement sur la carte
  const onMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMapCoordinate((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <SecondaryLayout>
        <View className='py-10'>
          <Formik
            initialValues={{
              title: '',
              description: '',
              is_private: false,
              password: '',
              difficulty: 3,
              latitude: String(mapCoordinate.latitude),
              longitude: String(mapCoordinate.longitude),
            }}
            validationSchema={riddleSchema}
            onSubmit={(values) => {
              // Ici, tu gères la soumission du formulaire (appel de service API, etc.)
              console.log('Form submitted', values);
            }}
          >
            {({ handleSubmit, values, setFieldValue, isValid, isSubmitting }) => (
              <View className="gap-8">

                {/* Privée ou publique */}
                <View className="px-6 flex-1 gap-3">
                  <Text className="text-dark dark:text-light">Partie</Text>
                  <View className='flex-row'>
                    <TouchableOpacity onPress={() => setFieldValue('is_private', false)} className="flex-1 flex-row items-center">
                      <View className={`w-5 h-5 border border-gray-400 rounded-full ${!values.is_private ? 'bg-secondary-darker dark:bg-secondary-lighter' : ''}`} />
                      <Text className="ml-2 text-dark dark:text-light">Publique</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFieldValue('is_private', true)} className="flex-1 flex-row items-center">
                      <View className={`w-5 h-5 border border-gray-400 rounded-full ${values.is_private ? 'bg-secondary-darker dark:bg-secondary-lighter' : ''}`} />
                      <Text className="ml-2 text-dark dark:text-light">Privée</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Mot de passe (affiché si privé) */}
                  {values.is_private && (
                    <FormField
                      name="password"
                      placeholder="Entrez un mot de passe"
                      isPassword
                    />
                  )}
                </View>


                {/* Titre */}
                <View className='px-6'>
                  <FormField
                    name="title"
                    label="Titre"
                    placeholder="Entrez le titre de votre énigme"
                  />
                </View>      

                {/* Description */}
                <View className='px-6'>
                  <Text className="text-dark dark:text-light mb-2">Description</Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-300 rounded-lg p-3"
                    multiline
                    numberOfLines={10}
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    placeholder="Décrivez votre énigme..."
                    onChangeText={(text: string) => setFieldValue('description', text)}
                    value={values.description}
                    style={{ height: 150, textAlignVertical: 'top' }}
                  />
                  <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1 text-right">
                    {DESCRIPTION_MAX_LENGTH - values.description.length} caractères restants
                  </Text>
                </View>

                {/* Difficulté */}
                <View className='px-6 gap-4'>
                  <View className='flex-row gap-3'>
                    <Text className="text-dark dark:text-light">Difficulté :</Text>
                    <Text className="text-secondary-darker dark:text-secondary-lighter font-semibold">{values.difficulty}</Text>
                  </View>
                  <Slider
                    minimumValue={1}
                    maximumValue={5}
                    step={1}
                    value={values.difficulty}
                    onValueChange={(value) => setFieldValue('difficulty', value)}
                    minimumTrackTintColor={isDark ? colors.secondary.lighter : colors.secondary.darker}
                    maximumTrackTintColor={isDark ? colors.gray.four : colors.gray.five}
                    thumbTintColor={isDark ? colors.secondary.lighter : colors.secondary.darker}
                  />
                </View>

                {/* Carte */}
                <View className='gap-2'>
                  <Text className='px-6 text-dark dark:text-light'>Localisation :</Text>
                  <View className="h-64 overflow-hidden mb-6">
                    <MapView
                      style={{ flex: 1 }}
                      initialRegion={mapCoordinate}
                      onPress={onMapPress}
                    >
                      <Marker coordinate={{ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude }} />
                    </MapView>
                  </View>
                </View>

                {/* Mise à jour des coordonnées dans le formulaire */}
                {/* <View className="flex-row justify-between">
                  <Text className="text-gray-500 text-sm">Latitude: {mapCoordinate.latitude.toFixed(6)}</Text>
                  <Text className="text-gray-500 text-sm">Longitude: {mapCoordinate.longitude.toFixed(6)}</Text>
                </View> */}

                {/* Mettre à jour les champs du formulaire en fonction du changement de la carte */}
                {/* {setFieldValue('latitude', String(mapCoordinate.latitude))}
                {setFieldValue('longitude', String(mapCoordinate.longitude))} */}

                {/* Bouton de soumission */}
                <View className='px-6'>
                  <GradientButton
                    onPress={() => handleSubmit()}
                    title="Créer le brouillon"
                    colors={isDark ? [colors.primary.mid, colors.primary.lighter] : [colors.primary.darker, colors.primary.mid]}
                    textColor={isDark ? 'text-dark' : 'text-light'}
                    isLoading={isSubmitting}
                    disabled={isSubmitting || !isValid}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </SecondaryLayout>
    </KeyboardAvoidingView>
  );
}