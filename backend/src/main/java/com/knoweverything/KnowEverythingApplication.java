package com.knoweverything;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KnowEverythingApplication {
    public static void main(String[] args) {
        SpringApplication.run(KnowEverythingApplication.class, args);
        System.out.println("""
            ╔══════════════════════════════════════════╗
            ║       KNOW EVERYTHING API STARTED        ║
            ║   Backend  → http://localhost:8080       ║
            ║   H2 DB    → http://localhost:8080/h2-console ║
            ║   Ollama   → http://localhost:11434      ║
            ╚══════════════════════════════════════════╝
            """);
    }
}
