import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {HomeNavigationProp} from '../../../../../core/navigation/main-stack/main-stack.navigation';
import {TaskList} from '../../../../tasks/presentation/components/task-list/task-list.component';
import {ProjectHeader} from '../project-header/project-header.component';
import {MainWrapper} from './project-layout.styled';

export interface ProjectLayoutProps {
  id: string;
  title: string;
  description: string;
  taskIds: Array<string>;
}

export const ProjectLayout: React.FC<ProjectLayoutProps> = props => {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <MainWrapper
      onPress={() => navigation.navigate('Project', {projectId: props.id})}>
      <ProjectHeader
        projectName={props.title}
        projectDescription={props.description}
      />
      <TaskList ids={props.taskIds} />
    </MainWrapper>
  );
};
