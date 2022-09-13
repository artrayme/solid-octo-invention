import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors} from '../../../../../common/constants/colors';
import {TASK_ACTIONS} from '../../../../../core/redux/actions';

interface AddTaskButtonProps {
  projectId: string;
}

export const AddTaskButton: React.FC<AddTaskButtonProps> = props => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 15,
        right: 15,
        height: 52,
        width: 52,
        borderRadius: 26,
        backgroundColor: colors.avatarPlaceholder,
      }}
      onPress={() => {
        dispatch(
          TASK_ACTIONS.CREATE_TASK.TRIGGERED({projectId: props.projectId}),
        );
      }}
    />
  );
};
