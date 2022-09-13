package com.github.straight.task.tracker.repositories;

import java.util.List;

import com.github.straight.task.tracker.domain.Project;
import com.github.straight.task.tracker.knowledge.base.ProjectEntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectRepositoryImpl implements ProjectRepository {
    @Autowired
    private ProjectEntityManager projectManager;

    @Override
    public Project save(Project project) {
        return projectManager.save(project);
    }

    @Override
    public void deleteById(String projectId) {
        projectManager.deleteEntityById(projectId);
    }

    @Override
    public List<Project> findProjectByUserId(String userId) {
        return projectManager.findAll().stream()
                .filter(t -> t.getUserId().equals(userId))
                .toList();
    }

    @Override
    public Project findProjectById(String id) {
        return projectManager.findAll().stream()
                .filter(t -> t.getId().equals(id))
                .findFirst().orElseThrow();
    }
}
