package com.knoweverything.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ChatRequest {

    @NotBlank(message = "Message cannot be empty")
    private String message;

    @NotNull(message = "Category is required")
    private String category;

    // Optional: previous messages for context
    private List<MessageHistory> history;

    @Data
    public static class MessageHistory {
        private String role;   // "user" or "assistant"
        private String content;
    }
}
