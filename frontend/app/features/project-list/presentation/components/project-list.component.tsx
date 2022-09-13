import * as React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useSelector} from 'react-redux';
import {getProjects} from '../../../../core/redux/selectors';
import {ProjectLayout} from '../../../project-item/presentation/components/project-item/project-layout.component';

export const ProjectList: React.FC = () => {
  const projects = useSelector(getProjects);
  const renderItem: ListRenderItem<{
    id: string;
    title: string;
    description: string;
    taskIds: Array<string>;
  }> = ({item}) => {
    return (
      <ProjectLayout
        id={item.id}
        title={item.title}
        description={item.description}
        taskIds={item.taskIds}
      />
    );
  };
  return (
    <FlatList
      style={{flex: 1, width: '100%', paddingRight: 16}}
      data={projects}
      renderItem={renderItem}
    />
  );
};
