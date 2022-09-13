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
import {PROJECT_ACTIONS, USER_ACTIONS} from '../../../../../core/redux/actions';

export const EditUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20}}>User Name</Text>
      <TextInput
        placeholder="new user name"
        style={{width: 250, borderBottomWidth: 1, fontSize: 20}}
        value={name}
        onChangeText={setName}
      />
      <View style={{height: 16}} />
      <Text style={{fontSize: 20}}>User Role</Text>
      <TextInput
        placeholder="new user role"
        style={{width: 250, borderBottomWidth: 1, fontSize: 20}}
        value={role}
        onChangeText={setRole}
      />
      <View style={{height: 16}} />

      <TouchableOpacity
        onPress={() => {
          dispatch(
            USER_ACTIONS.UPDATE_USER.TRIGGERED({
              name: name,
              role: role,
            }),
          );
          navigation.goBack();
        }}>
        <Text>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
