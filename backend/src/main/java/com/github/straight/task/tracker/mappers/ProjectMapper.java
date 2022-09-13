package com.github.straight.task.tracker.mappers;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.github.straight.task.tracker.domain.Project;
import com.github.straight.task.tracker.model.ProjectDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    ProjectDto projectToDto(Project project);

    default List<ProjectDto> projectsToDtoList(Collection<Project> projects) {
        return projects.stream().map(INSTANCE::projectToDto).collect(Collectors.toList());
    }
}
