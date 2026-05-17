package com.knoweverything.service;

import com.knoweverything.model.ChatHistory;
import com.knoweverything.model.ChatRequest;
import com.knoweverything.model.ChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final OllamaService ollamaService;
    private final ChatHistoryRepository chatHistoryRepository;

    /**
     * Main entry point: processes a chat request and returns AI response.
     */
    public ChatResponse processChat(ChatRequest request) {
        log.info("Processing chat request - Category: {}", request.getCategory());

        try {
            // Get AI response from Ollama
            String aiReply = ollamaService.chat(request);

            // Save to database
            ChatHistory history = ChatHistory.builder()
                    .category(request.getCategory())
                    .userMessage(request.getMessage())
                    .aiResponse(aiReply)
                    .model(ollamaService.getModel())
                    .build();
            chatHistoryRepository.save(history);

            return ChatResponse.builder()
                    .reply(aiReply)
                    .category(request.getCategory())
                    .model(ollamaService.getModel())
                    .timestamp(LocalDateTime.now())
                    .success(true)
                    .build();

        } catch (Exception e) {
            log.error("Error processing chat: {}", e.getMessage());
            return ChatResponse.builder()
                    .reply(null)
                    .category(request.getCategory())
                    .timestamp(LocalDateTime.now())
                    .success(false)
                    .error(e.getMessage())
                    .build();
        }
    }

    /**
     * Get recent chat history for a category.
     */
    public List<ChatHistory> getHistoryByCategory(String category) {
        return chatHistoryRepository.findTop20ByCategoryOrderByCreatedAtDesc(category);
    }

    /**
     * Get all recent chats.
     */
    public List<ChatHistory> getAllHistory() {
        return chatHistoryRepository.findTop50ByOrderByCreatedAtDesc();
    }

    /**
     * Get stats about usage.
     */
    public Map<String, Object> getStats() {
        long total = chatHistoryRepository.count();
        return Map.of(
            "totalChats", total,
            "ollamaHealthy", ollamaService.isOllamaHealthy(),
            "model", ollamaService.getModel()
        );
    }
}
