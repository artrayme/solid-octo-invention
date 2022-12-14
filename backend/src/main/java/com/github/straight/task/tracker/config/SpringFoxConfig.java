package com.github.straight.task.tracker.config;

import com.fasterxml.classmate.TypeResolver;
import com.github.straight.task.tracker.model.ErrorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class SpringFoxConfig {
    private final TypeResolver typeResolver;

    @Autowired
    public SpringFoxConfig(TypeResolver typeResolver) {
        this.typeResolver = typeResolver;
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.github.straight.task.tracker"))
                .paths(PathSelectors.any())
                .build()
                .additionalModels(typeResolver.resolve(ErrorDto.class));
    }
}
