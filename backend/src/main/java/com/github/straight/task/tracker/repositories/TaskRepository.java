package com.github.straight.task.tracker.repositories;

import java.util.List;

import com.github.straight.task.tracker.domain.Task;

public interface TaskRepository {
    Task save(Task task);

    void deleteTaskById(String id);

    Task findTaskById(String id);

    List<Task> findTasksByProjectId(String projectId);
}
