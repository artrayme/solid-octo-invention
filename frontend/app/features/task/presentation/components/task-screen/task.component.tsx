import {useRoute} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {colors} from '../../../../../common/constants/colors';
import {TaskRouteProp} from '../../../../../core/navigation/main-stack/main-stack.navigation';
import {TaskHeader} from '../task-header/task-header.component';
import {TaskWrapper} from './task.styled';
import {TaskDescription} from '../task-description/task-description.component';
import {getTaskById} from '../../../../../core/redux/selectors';
import {getTaskColor} from '../../../../tasks/utils/get-task-color.utils';
import {TASK_STATUSES} from '../../../../../common/types/task-status.type';
import {StatusSwitcher} from '../status-switcher/status-switcher.component';

export interface ProjectScreenProps {}

export const TaskScreen: React.FC<ProjectScreenProps> = () => {
  const {params} = useRoute<TaskRouteProp>();

  const task = useSelector(state => getTaskById(state, params.taskId));
  if (!task) {
    return null;
  }
  const {secondary} = getTaskColor(task.status as TASK_STATUSES);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: secondary}}>
      <TaskWrapper>
        <TaskHeader title={task.title} id={task.id} />
        <TaskDescription description={task.description} />
        <StatusSwitcher
          status={task.status as TASK_STATUSES}
          taskId={params.taskId}
        />
      </TaskWrapper>
    </SafeAreaView>
  );
};
