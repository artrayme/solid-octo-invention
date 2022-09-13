import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ProjectScreen} from '../../../features/project/presentation/components/project-screen/project.component';
import {navigationOptionsFactory} from './main-stack-navigation-options.factory';
import {HomeScreen} from '../../../features/home/presentation/components/home-screen/home-screen.component';
import {TaskScreen} from '../../../features/task/presentation/components/task-screen/task.component';
import {EditProjectScreen} from '../../../features/project/presentation/components/edit/edit-project.component';
import {EditTaskScreen} from '../../../features/task/presentation/components/edit/edit-task.component';
import {EditUserScreen} from '../../../features/home/presentation/components/edit/edit-user.component';

type MainStackScreens = {
  Project: {projectId: string};
  Task: {taskId: string};
  Home: undefined;
  EditProject: {projectId: string};
  EditTask: {taskId: string};
  EditUser: undefined;
};

export type HomeNavigationProp = NativeStackScreenProps<
  MainStackScreens,
  'Home'
>['navigation'];
export type ProjectRouteProp = NativeStackScreenProps<
  MainStackScreens,
  'Project'
>['route'];

export type TaskRouteProp = NativeStackScreenProps<
  MainStackScreens,
  'Task'
>['route'];

export type EditProjectRouteProp = NativeStackScreenProps<
  MainStackScreens,
  'EditProject'
>['route'];

export type EditTaskRouteProp = NativeStackScreenProps<
  MainStackScreens,
  'EditTask'
>['route'];

const MainStack = createNativeStackNavigator<MainStackScreens>();

export const MainStackNavigator: React.FC = () => {
  return (
    <MainStack.Navigator screenOptions={navigationOptionsFactory()}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Project" component={ProjectScreen} />
      <MainStack.Screen name="Task" component={TaskScreen} />
      <MainStack.Screen name="EditProject" component={EditProjectScreen} />
      <MainStack.Screen name="EditTask" component={EditTaskScreen} />
      <MainStack.Screen name="EditUser" component={EditUserScreen} />
    </MainStack.Navigator>
  );
};
