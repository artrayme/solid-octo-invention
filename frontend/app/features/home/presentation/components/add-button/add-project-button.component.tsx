import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors} from '../../../../../common/constants/colors';
import {PROJECT_ACTIONS} from '../../../../../core/redux/actions';

export const AddProjectButton: React.FC = () => {
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
        dispatch(PROJECT_ACTIONS.CREATE_PROJECT.TRIGGERED());
      }}
    />
  );
};
