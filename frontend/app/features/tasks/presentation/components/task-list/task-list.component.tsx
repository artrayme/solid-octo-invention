import React from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {useSelector} from 'react-redux';
import {TASK_STATUSES} from '../../../../../common/types/task-status.type';
import {getTasks} from '../../../../../core/redux/selectors';
import {TaskItem} from '../task-item/taks-item.component';

interface TaskListProps {
  ids: Array<string>;
}

export const TaskList: React.FC<TaskListProps> = props => {
  const tasks = useSelector(getTasks);

  const currentProjectTasks = props.ids.map(id => tasks.get(id));

  const renderItem: ListRenderItem<{
    id: number;
    title: string;
    description: string;
    status: keyof typeof TASK_STATUSES;
  }> = ({item}) => {
    return (
      <TaskItem
        id={item.id}
        taskName={item.title}
        taskDescription={item.description}
        taskStatus={item.status}
      />
    );
  };
  return (
    <FlatList
      data={currentProjectTasks}
      renderItem={renderItem}
      style={{width: '100%'}}
      ItemSeparatorComponent={() => <View style={{height: 12}} />}
    />
  );
};
