import * as React from 'react';
import {Text, View} from 'react-native';

interface TaskDescriptionProps {
  description: string;
}

export const TaskDescription: React.FC<TaskDescriptionProps> = ({
  description,
}) => {
  return (
    <View style={{marginBottom: 24}}>
      <Text style={{fontSize: 14}}>{description}</Text>
    </View>
  );
};
