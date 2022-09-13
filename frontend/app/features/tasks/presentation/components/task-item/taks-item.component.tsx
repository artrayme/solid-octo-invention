import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {TASK_STATUSES} from '../../../../../common/types/task-status.type';
import {HomeNavigationProp} from '../../../../../core/navigation/main-stack/main-stack.navigation';
import {getTaskColor} from '../../../utils/get-task-color.utils';
import {TaskContent} from '../task-content/task-content.component';
import {TaskStatusIndicator} from '../task-status-indicator/task-status-indicator.component';
import {TaskVerticalDecorator, TaskWrapper} from './task-item.styled';

export interface TaskItemProps {
  id: string;
  taskName: string;
  taskDescription: string;
  taskStatus: string;
}

export const TaskItem: React.FC<TaskItemProps> = props => {
  const {tint, secondary} = useMemo(
    () => getTaskColor(props.taskStatus as TASK_STATUSES),
    [props.taskStatus],
  );
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <TaskWrapper
      background={secondary}
      onPress={() => {
        navigation.navigate('Task', {taskId: props.id});
      }}>
      <TaskVerticalDecorator background={tint} />
      <TaskContent
        taskName={props.taskName}
        taskDescription={props.taskDescription}
      />
      <TaskStatusIndicator taskStatus={props.taskStatus as TASK_STATUSES} />
    </TaskWrapper>
  );
};
