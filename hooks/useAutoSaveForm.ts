import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAutoSaveForm = (formValues: any, storageKey: string) => {
  // Sauvegarder les valeurs du formulaire dans le storage avec un debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      AsyncStorage.setItem(storageKey, JSON.stringify(formValues))
        .catch((err) => console.error('Erreur lors de la sauvegarde du formulaire :', err));
    }, 500); // sauvegarde après 500ms d'inactivité

    return () => clearTimeout(timeout);
  }, [formValues, storageKey]);
};

export const loadFormState = async (storageKey: string) => {
  try {
    const storedData = await AsyncStorage.getItem(storageKey);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error('Erreur lors du chargement du formulaire sauvegardé :', error);
    return null;
  }
};

export const clearFormState = async (storageKey: string) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Erreur lors du reset de l\'état du formulaire :', error);
  }
};