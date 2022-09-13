import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {HomeNavigationProp} from '../../../../../core/navigation/main-stack/main-stack.navigation';

interface TaskHeaderProps {
  title: string;
  id: string;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({title, id}) => {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View style={{width: '100%', alignItems: 'center', marginVertical: 20}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'red',
          height: 20,
          width: 20,
        }}
        onPress={() => navigation.goBack()}
      />
      <Text style={{fontSize: 24, fontWeight: '600'}}>{title}</Text>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        onPress={() => navigation.navigate('EditTask', {taskId: id})}>
        <Text style={{fontSize: 14, fontWeight: '600'}}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};
