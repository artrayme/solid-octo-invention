package com.github.straight.task.tracker.knowledge.base;

import java.util.ArrayList;
import java.util.List;

import com.github.straight.task.tracker.domain.Project;
import org.ostis.api.context.DefaultScContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectEntityManager extends SemanticCodeAbstractEntityManager<Project> {
    @Autowired
    public ProjectEntityManager(DefaultScContext context) {
        super(context);
    }

    public Project save(Project project) {
        try {
            var uuid = saveEntity(project);
            return project.setId(uuid);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<Project> findAll() {
        var projects = new ArrayList<Project>();
        getEntityIds().forEach(id -> {
            try {
                projects.add(loadEntity(new Project(), id).setId(id));
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        });
        return projects;
    }
}
