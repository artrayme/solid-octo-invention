package com.github.straight.task.tracker;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class TaskTrackerBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(TaskTrackerBackendApplication.class, args);
	}
}
