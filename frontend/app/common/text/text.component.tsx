import React from 'react';
import {Text as RNText} from 'react-native';

interface TextProps {
  children: React.ReactNode;
}

// TODO: extend behavior

export const Text: React.FC<TextProps> = ({children, ...rest}) => {
  return <RNText {...rest}>{children}</RNText>;
};
