import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const navigationOptionsFactory = (): NativeStackNavigationOptions => {
  return {
    headerShown: false,
  };
};
