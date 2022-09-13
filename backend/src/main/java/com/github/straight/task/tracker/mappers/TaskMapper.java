package com.github.straight.task.tracker.mappers;

import java.util.Collection;
import java.util.List;

import com.github.straight.task.tracker.domain.Task;
import com.github.straight.task.tracker.model.TaskDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    TaskDto taskToDto(Task task);

    default List<TaskDto> tasksToDtoList(Collection<Task> taskList) {
        return taskList.stream().map(INSTANCE::taskToDto).toList();
    }
}
