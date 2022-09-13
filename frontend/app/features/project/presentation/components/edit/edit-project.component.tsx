import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {EditProjectRouteProp} from '../../../../../core/navigation/main-stack/main-stack.navigation';
import {PROJECT_ACTIONS} from '../../../../../core/redux/actions';

export const EditProjectScreen: React.FC = () => {
  const navigation = useNavigation();
  const {params} = useRoute<EditProjectRouteProp>();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20}}>Project Name</Text>
      <TextInput
        placeholder="new project name"
        style={{width: 250, borderBottomWidth: 1, fontSize: 20}}
        value={name}
        onChangeText={setName}
      />
      <View style={{height: 16}} />
      <Text style={{fontSize: 20}}>Project Description</Text>
      <TextInput
        placeholder="new project description"
        style={{width: 250, borderBottomWidth: 1, fontSize: 20}}
        value={desc}
        onChangeText={setDesc}
      />
      <View style={{height: 16}} />

      <TouchableOpacity
        onPress={() => {
          dispatch(
            PROJECT_ACTIONS.UPDATE_PROJECT.TRIGGERED({
              projectId: params.projectId,
              projectDescription: desc,
              projectName: name,
            }),
          );
          navigation.goBack();
        }}>
        <Text>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
