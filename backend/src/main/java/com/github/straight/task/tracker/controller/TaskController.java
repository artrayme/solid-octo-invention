package com.github.straight.task.tracker.controller;

import java.util.List;

import javax.transaction.Transactional;

import com.github.straight.task.tracker.api.TasksApi;
import com.github.straight.task.tracker.domain.Task;
import com.github.straight.task.tracker.mappers.TaskMapper;
import com.github.straight.task.tracker.model.TaskDto;
import com.github.straight.task.tracker.model.TaskMutation;
import com.github.straight.task.tracker.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@Transactional
@RestController
public class TaskController implements TasksApi {
    private static final TaskMapper MAPPER = TaskMapper.INSTANCE;

    private final TaskRepository taskRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public ResponseEntity<TaskDto> updateTask(String taskId, TaskMutation mutation) {
        var task = taskRepository.findTaskById(taskId);

        if (mutation.getName() != null) {
            task.setName(mutation.getName());
        }
        if (mutation.getDescription() != null) {
            task.setDescription(mutation.getDescription());
        }
        if (mutation.getStatus() != null) {
            task.setStatus(mutation.getStatus());
        }

        task = taskRepository.save(task);

        return new ResponseEntity<>(MAPPER.taskToDto(task), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<TaskDto> createTask(String projectId) {
        var task = new Task()
                .setName("Имя задачи")
                .setDescription("Описание")
                .setProjectId(projectId)
                .setStatus("Backlog");

        task = taskRepository.save(task);

        return new ResponseEntity<>(MAPPER.taskToDto(task), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteTask(String taskId) {
        taskRepository.deleteTaskById(taskId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<TaskDto>> getTasksFromProject(String projectId) {
        var tasks = taskRepository.findTasksByProjectId(projectId);
        return new ResponseEntity<>(MAPPER.tasksToDtoList(tasks), HttpStatus.OK);
    }
}
