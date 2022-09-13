import React from 'react';
import {Text} from '../../../../../common/text/text.component';
import {HeaderWrapper} from './project-header.styled';

export interface ProjectHeaderProps {
  projectName: string;
  projectDescription?: string;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = props => {
  return (
    <HeaderWrapper>
      <Text style={{fontSize: 22, fontWeight: '500'}}>{props.projectName}</Text>
      <Text style={{fontSize: 14}}>{props.projectDescription}</Text>
    </HeaderWrapper>
  );
};
