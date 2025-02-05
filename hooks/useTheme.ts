import { useColorScheme } from 'react-native';
import { theme } from '../constants/theme';

export const useTheme = () => {
    const colorScheme = useColorScheme();
    return theme[colorScheme === 'dark' ? 'dark' : 'light'];
};