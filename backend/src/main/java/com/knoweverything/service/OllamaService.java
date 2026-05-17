package com.knoweverything.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.knoweverything.model.ChatRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Slf4j
public class OllamaService {

    @Value("${groq.api-key}")
    private String apiKey;

    @Value("${groq.base-url}")
    private String baseUrl;

    @Value("${groq.model}")
    private String model;

    private final SystemPromptService systemPromptService;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public OllamaService(SystemPromptService systemPromptService) {
        this.systemPromptService = systemPromptService;
    }

    public String chat(ChatRequest request) {
        String systemPrompt = systemPromptService.getSystemPrompt(request.getCategory());

        // Build messages list
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", systemPrompt));

        // Add history
        if (request.getHistory() != null) {
            for (ChatRequest.MessageHistory h : request.getHistory()) {
                messages.add(Map.of("role", h.getRole(), "content", h.getContent()));
            }
        }

        // Add current message
        messages.add(Map.of("role", "user", "content", request.getMessage()));

        // Build request body
        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", messages);
        body.put("max_tokens", 2048);
        body.put("temperature", 0.7);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    baseUrl + "/chat/completions", entity, String.class);

            JsonNode root = objectMapper.readTree(response.getBody());
            return root.path("choices").get(0)
                    .path("message").path("content").asText();

        } catch (Exception e) {
            log.error("Groq API error: {}", e.getMessage());
            throw new RuntimeException("AI service error: " + e.getMessage());
        }
    }

    public boolean isOllamaHealthy() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            restTemplate.exchange(baseUrl + "/models",
                    HttpMethod.GET, entity, String.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getModel() {
        return model;
    }
}