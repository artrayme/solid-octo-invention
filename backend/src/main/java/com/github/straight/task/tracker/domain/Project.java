package com.github.straight.task.tracker.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Data
@Accessors(chain = true)
public class Project {
    @Id
    @GeneratedValue
    private String id;
    @NotNull
    private String userId;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
}
