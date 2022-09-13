import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {Button} from '../../../../../common/button/button.component';
import {colors} from '../../../../../common/constants/colors';
import {Text} from '../../../../../common/text/text.component';
import {
  HomeNavigationProp,
  ProjectRouteProp,
} from '../../../../../core/navigation/main-stack/main-stack.navigation';
import {getProjectById} from '../../../../../core/redux/selectors';
import {TaskList} from '../../../../tasks/presentation/components/task-list/task-list.component';
import {AddTaskButton} from '../add-button/add-task-button.component';
import {ProjectDescription} from '../project-description/project-description.component';
import {ProjectHeader} from '../project-header/project-header.component';
import {LoginWrapper} from './project.styled';

export interface ProjectScreenProps {}

export const ProjectScreen: React.FC<ProjectScreenProps> = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const {params} = useRoute<ProjectRouteProp>();

  const project = useSelector(state => getProjectById(state, params.projectId));
  if (!project.length) {
    return null;
  }
  const proj = project.reduce((acc, it) => (acc = it), {}) as {
    id: string;
    title: string;
    description: string;
    taskIds: string[];
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.milkWhite}}>
      <LoginWrapper>
        <ProjectHeader title={proj.title} id={proj.id} />
        <ProjectDescription description={proj.description} />
        <View style={{marginLeft: -16, flex: 1}}>
          <TaskList ids={proj.taskIds} />
        </View>
        <AddTaskButton projectId={proj.id} />
      </LoginWrapper>
    </SafeAreaView>
  );
};
