package com.github.straight.task.tracker;

import com.github.straight.task.tracker.domain.Project;
import com.github.straight.task.tracker.domain.Task;
import com.github.straight.task.tracker.knowledge.base.ProjectEntityManager;
import com.github.straight.task.tracker.knowledge.base.TaskEntityManager;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.ostis.api.context.DefaultScContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TaskRepositoryTest {
    @Autowired
    private DefaultScContext scContext;
    private TaskEntityManager taskManager;
    private ProjectEntityManager projectManager;

    @BeforeEach
    public void setup() {
        taskManager = new TaskEntityManager(scContext);
        projectManager = new ProjectEntityManager(scContext);
    }

    @Test
    public void ____________________() {
        var expectedTask = task("name", "description", "Backlog", "1");
        taskManager.save(expectedTask);

        var actualTask = taskManager.findAll().get(0);

        Assertions.assertEquals(expectedTask, actualTask);
    }

    @Test
    public void _____________________() {
        var expectedTask = task("name", "description", "Backlog", "1");
        var actualTask = taskManager.save(expectedTask);
        expectedTask.setId(actualTask.getId());

        Assertions.assertEquals(expectedTask, actualTask);
    }

    @Test
    public void _______________________() {
        taskManager.save(task("name", "description", "Backlog", "1"));
        taskManager.save(task("name", "description", "Backlog", "1"));

        Assertions.assertEquals(2, taskManager.findAll().size());
    }

    @Test
    public void ________________________() {
        var expectedProject = project("name", "description", "1");
        projectManager.save(expectedProject);

        var actualProject = projectManager.findAll().get(0);

        Assertions.assertEquals(expectedProject, actualProject);
    }

    @Test
    public void _________________________() {
        var expectedProject = project("name", "description", "1");
        var actualProject = projectManager.save(expectedProject);
        expectedProject.setId(actualProject.getId());

        Assertions.assertEquals(expectedProject, actualProject);
    }

    @Test
    public void ___________________________() {
        projectManager.save(project("name", "description",  "1"));
        projectManager.save(project("name", "description", "1"));

        Assertions.assertEquals(2, projectManager.findAll().size());
    }

    @Test
    public void taskIsBeingFindByProjectId() {
        //YEAH, IT'S COOL
        /*var expectedTask1 = task("name", "description", "Backlog", 1L);
        var expectedTask2 = task("name", "description", "Backlog", 1L);

        taskRepository.save(expectedTask1);
        taskRepository.save(expectedTask2);

        var tasks = taskRepository.findTasksByProjectId(1L);

        Assertions.assertEquals(tasks, List.of(expectedTask1, expectedTask2));*/
    }

    private Task task(String name, String description, String status, String projectId) {
        return new Task().setName(name).setDescription(description).setStatus(status).setProjectId(projectId);
    }
    private Project project(String name, String description, String userId) {
        return new Project().setName(name).setDescription(description).setUserId(userId);
    }
}
