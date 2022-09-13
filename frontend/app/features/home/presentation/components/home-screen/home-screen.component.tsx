import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {HomeNavigationProp} from '../../../../../core/navigation/main-stack/main-stack.navigation';
import {getUser} from '../../../../../core/redux/selectors';
import {ProjectList} from '../../../../project-list/presentation/components/project-list.component';
import {AddProjectButton} from '../add-button/add-project-button.component';
import {HomeHeader} from '../header/header.component';
import {HomeScreenWrapper} from './home-screen.styled';

export interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const user = useSelector(getUser);
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeScreenWrapper>
        <HomeHeader userPosition={user.role} username={user.name} />
        <ProjectList />
        <AddProjectButton />
      </HomeScreenWrapper>
    </SafeAreaView>
  );
};
