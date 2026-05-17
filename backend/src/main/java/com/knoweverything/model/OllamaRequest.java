package com.knoweverything.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OllamaRequest {

    private String model;
    private List<OllamaMessage> messages;
    private boolean stream;

    @JsonProperty("keep_alive")
    private String keepAlive;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OllamaMessage {
        private String role;
        private String content;
    }
}
