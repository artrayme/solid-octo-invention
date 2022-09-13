import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import {MainStackNavigator} from './core/navigation/main-stack/main-stack.navigation';
import {colors} from './common/constants/colors';
import {Provider} from 'react-redux';
import {store} from './core/redux/store';
import {enableMapSet} from 'immer';

enableMapSet();

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundGray,
  },
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};
