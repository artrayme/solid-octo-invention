package com.github.straight.task.tracker.repositories;

import java.util.List;

import com.github.straight.task.tracker.domain.Project;

public interface ProjectRepository {
    Project save(Project project);

    void deleteById(String projectId);

    List<Project> findProjectByUserId(String userId);

    Project findProjectById(String id);
}
