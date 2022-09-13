import {TabActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {EditTaskRouteProp} from '../../../../../core/navigation/main-stack/main-stack.navigation';
import {TASK_ACTIONS} from '../../../../../core/redux/actions';

export const EditTaskScreen: React.FC = () => {
  const navigation = useNavigation();
  const {params} = useRoute<EditTaskRouteProp>();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20}}>Task Name</Text>
      <TextInput
        placeholder="new task name"
        style={{width: 250, borderBottomWidth: 1, fontSize: 20}}
        value={name}
        onChangeText={setName}
      />
      <View style={{height: 16}} />
      <Text style={{fontSize: 20}}>Task Description</Text>
      <TextInput
        placeholder="new task description"
        style={{width: 250, borderBottomWidth: 1, fontSize: 20}}
        value={desc}
        onChangeText={setDesc}
      />
      <View style={{height: 16}} />

      <TouchableOpacity
        onPress={() => {
          dispatch(
            TASK_ACTIONS.UPDATE_TASK.TRIGGERED({
              taskId: params.taskId,
              taskDescription: desc,
              taskName: name,
            }),
          );
          navigation.goBack();
        }}>
        <Text>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
