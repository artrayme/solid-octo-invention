import React from 'react';
import {Text} from '../../../../../common/text/text.component';
import {TaskContentWrapper} from './task.content.styled';

export interface TaskContentProps {
  taskName: string;
  taskDescription: string;
}

export const TaskContent: React.FC<TaskContentProps> = props => {
  return (
    <TaskContentWrapper>
      <Text style={{fontSize: 22, marginBottom: 4}}>{props.taskName}</Text>
      <Text style={{fontSize: 14}}>{props.taskDescription}</Text>
    </TaskContentWrapper>
  );
};
