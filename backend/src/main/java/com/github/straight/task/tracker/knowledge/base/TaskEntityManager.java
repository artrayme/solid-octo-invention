package com.github.straight.task.tracker.knowledge.base;

import java.util.ArrayList;
import java.util.List;

import com.github.straight.task.tracker.domain.Task;
import org.ostis.api.context.DefaultScContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TaskEntityManager extends SemanticCodeAbstractEntityManager<Task> {
    @Autowired
    public TaskEntityManager(DefaultScContext context) {
        super(context);
    }

    public Task save(Task task) {
        try {
            var uuid = saveEntity(task);
            return task.setId(uuid);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<Task> findAll() {
        var tasks = new ArrayList<Task>();
        getEntityIds().forEach(id -> {
            try {
                tasks.add(loadEntity(new Task(), id).setId(id));
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        });
        return tasks;
    }
}
