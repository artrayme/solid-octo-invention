package com.github.straight.task.tracker.controller;

import java.util.List;

import javax.transaction.Transactional;

import com.github.straight.task.tracker.api.ProjectsApi;
import com.github.straight.task.tracker.domain.Project;
import com.github.straight.task.tracker.mappers.ProjectMapper;
import com.github.straight.task.tracker.model.ProjectDto;
import com.github.straight.task.tracker.model.ProjectMutation;
import com.github.straight.task.tracker.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@Transactional
@RestController
public class ProjectsController implements ProjectsApi {
    private static final ProjectMapper MAPPER = ProjectMapper.INSTANCE;

    private final ProjectRepository projectRepository;

    @Autowired
    ProjectsController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public ResponseEntity<List<ProjectDto>> getProjects(String userId) {
        var projects = projectRepository.findProjectByUserId(userId);

        return new ResponseEntity<>(MAPPER.projectsToDtoList(projects), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ProjectDto> updateProject(String projectId, ProjectMutation mutation) {
        var project = projectRepository.findProjectById(projectId);

        if (mutation.getName() != null) {
            project.setName(mutation.getName());
        }
        if (mutation.getDescription() != null) {
            project.setDescription(mutation.getDescription());
        }

        project = projectRepository.save(project);

        return new ResponseEntity<>(MAPPER.projectToDto(project), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProjectDto> createProject(String userId) {
        var project = new Project()
                .setUserId(userId)
                .setName("Project name")
                .setDescription("Description");

        project = projectRepository.save(project);

        return new ResponseEntity<>(MAPPER.projectToDto(project), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Void> deleteProject(String projectId) {
        projectRepository.deleteById(projectId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
