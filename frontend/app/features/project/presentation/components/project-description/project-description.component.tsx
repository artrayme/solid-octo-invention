import * as React from 'react';
import {Text, View} from 'react-native';

interface ProjectDescriptionProps {
  description: string;
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  description,
}) => {
  return (
    <View style={{marginBottom: 24}}>
      <Text style={{fontSize: 14}}>{description}</Text>
    </View>
  );
};
