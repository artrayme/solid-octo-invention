import React from 'react';
import {Pressable} from 'react-native';

export interface ButtonProps {
  onPress: () => void;
}

// TODO: extend pressable logic

export const Button: React.FC<ButtonProps> = props => {
  const defaultStyle = {
    height: 30,
    width: 100,
    borderWidth: 1,
  };
  return <Pressable onPress={props.onPress} style={{...defaultStyle}} />;
};
