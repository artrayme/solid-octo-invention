import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../../../common/constants/colors';
import {HomeNavigationProp} from '../../../../../core/navigation/main-stack/main-stack.navigation';

interface HomeHeaderProps {
  username: string;
  userPosition: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = props => {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 16,
        marginVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 64,
          width: 64,
          borderRadius: 32,
          backgroundColor: colors.avatarPlaceholder,
        }}
      />
      <View style={{flex: 1, paddingHorizontal: 12}}>
        <Text style={{fontWeight: '600', fontSize: 24}}>{props.username}</Text>
        <Text style={{fontSize: 16}}>{props.userPosition}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('EditUser')}>
        <Text style={{fontSize: 14, fontWeight: '600'}}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};
