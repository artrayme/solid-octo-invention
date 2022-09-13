import React, {useMemo} from 'react';
import {colors} from '../../../../../common/constants/colors';
import {Text} from '../../../../../common/text/text.component';
import {TASK_STATUSES} from '../../../../../common/types/task-status.type';
import {getTaskColor} from '../../../utils/get-task-color.utils';
import {StatusWrapper} from './task-status-indicator.styled';

export interface TaskStatusIndicatorProps {
  taskStatus: TASK_STATUSES;
}

export const TaskStatusIndicator: React.FC<
  TaskStatusIndicatorProps
> = props => {
  const {tint} = useMemo(
    () => getTaskColor(props.taskStatus),
    [props.taskStatus],
  );
  return (
    <StatusWrapper background={tint}>
      <Text style={{fontSize: 14, color: colors.milkWhite}}>
        {props.taskStatus}
      </Text>
    </StatusWrapper>
  );
};
