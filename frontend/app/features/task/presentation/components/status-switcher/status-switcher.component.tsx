import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors} from '../../../../../common/constants/colors';
import {TASK_STATUSES} from '../../../../../common/types/task-status.type';
import {TASK_ACTIONS} from '../../../../../core/redux/actions';
import {getTaskColor} from '../../../../tasks/utils/get-task-color.utils';

interface StatusSwitcherProps {
  taskId: string;
  status: TASK_STATUSES;
}

export const StatusSwitcher: React.FC<StatusSwitcherProps> = ({
  status,
  taskId,
}) => {
  const keys = Object.values(TASK_STATUSES);
  const dispatch = useDispatch();

  return (
    <View style={{alignItems: 'flex-end', marginRight: -16}}>
      {keys.map(key => {
        const {tint, secondary} = getTaskColor(key);
        const color = status === key ? tint : secondary;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => {
              if (status === key) {
                return;
              }
              dispatch(
                TASK_ACTIONS.SET_STATUS.TRIGGERED({taskId, status: key}),
              );
            }}
            style={{
              backgroundColor: colors.milkWhite,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              paddingVertical: 12,
              paddingLeft: 12,
              borderLeftWidth: 2,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderColor: colors.backgroundGray,
              width: 120,
              marginBottom: 12,
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                backgroundColor: color,
                borderRadius: 30,
              }}>
              <Text style={{color: colors.milkWhite, fontSize: 14}}>{key}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
