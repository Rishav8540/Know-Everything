package com.knoweverything.controller;

import com.knoweverything.model.ChatHistory;
import com.knoweverything.model.ChatRequest;
import com.knoweverything.model.ChatResponse;
import com.knoweverything.service.ChatService;
import com.knoweverything.service.OllamaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;
    private final OllamaService ollamaService;

    /**
     * POST /api/v1/chat
     * Main chat endpoint — send a message, get an AI response.
     *
     * Request body:
     * {
     *   "message": "What is diabetes?",
     *   "category": "medical",
     *   "history": [  // optional
     *     { "role": "user", "content": "..." },
     *     { "role": "assistant", "content": "..." }
     *   ]
     * }
     */
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        log.info("POST /api/v1/chat - Category: {}", request.getCategory());
        ChatResponse response = chatService.processChat(request);

        if (!response.isSuccess()) {
            return ResponseEntity.internalServerError().body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/v1/health
     * Health check — verifies API and Ollama connection.
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        boolean ollamaUp = ollamaService.isOllamaHealthy();
        Map<String, Object> status = Map.of(
            "status", ollamaUp ? "UP" : "DEGRADED",
            "api", "UP",
            "ollama", ollamaUp ? "UP" : "DOWN",
            "model", ollamaService.getModel(),
            "message", ollamaUp
                ? "Know Everything API is fully operational!"
                : "API is running but Ollama is not reachable. Run: ollama serve"
        );
        return ResponseEntity.ok(status);
    }

    /**
     * GET /api/v1/history?category=medical
     * Get recent chat history for a category.
     */
    @GetMapping("/history")
    public ResponseEntity<List<ChatHistory>> getHistory(
            @RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) {
            return ResponseEntity.ok(chatService.getHistoryByCategory(category));
        }
        return ResponseEntity.ok(chatService.getAllHistory());
    }

    /**
     * GET /api/v1/stats
     * Usage statistics.
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> stats() {
        return ResponseEntity.ok(chatService.getStats());
    }

    /**
     * GET /api/v1/categories
     * List all available categories with descriptions.
     */
    @GetMapping("/categories")
    public ResponseEntity<List<Map<String, String>>> categories() {
        List<Map<String, String>> cats = List.of(
            Map.of("id", "general",          "label", "Ask Anything",        "icon", "🌍"),
            Map.of("id", "medical",          "label", "Medical & Health",     "icon", "🩺"),
            Map.of("id", "technology",       "label", "All Technologies",     "icon", "⚙️"),
            Map.of("id", "code",             "label", "Write Code",           "icon", "💻"),
            Map.of("id", "website",          "label", "Build Website/App",    "icon", "🌐"),
            Map.of("id", "books",            "label", "Books & Literature",   "icon", "📚"),
            Map.of("id", "language",         "label", "All Languages",        "icon", "🗣️"),
            Map.of("id", "law",              "label", "Legal & Rights",       "icon", "⚖️"),
            Map.of("id", "finance",          "label", "Finance & Money",      "icon", "💰"),
            Map.of("id", "science",          "label", "Science",              "icon", "🔬"),
            Map.of("id", "history",          "label", "History",              "icon", "🏛️"),
            Map.of("id", "medical_advanced", "label", "Advanced Medicine",    "icon", "🏥")
        );
        return ResponseEntity.ok(cats);
    }
}
