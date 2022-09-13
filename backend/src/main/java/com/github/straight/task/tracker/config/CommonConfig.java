package com.github.straight.task.tracker.config;

import java.net.URI;
import java.net.URISyntaxException;

import lombok.SneakyThrows;
import org.ostis.api.context.DefaultScContext;
import org.ostis.scmemory.websocketmemory.memory.SyncOstisScMemory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonConfig {
    @Bean
    SyncOstisScMemory scMemory() throws Exception {
        var memory = new SyncOstisScMemory(new URI("ws://localhost:8090/ws_json"));
        memory.open();
        return memory;
    }

    @Bean
    DefaultScContext defaultScContext() throws Exception {
        return new DefaultScContext(scMemory());
    }
}
