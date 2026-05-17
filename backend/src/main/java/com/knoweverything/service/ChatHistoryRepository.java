package com.knoweverything.service;

import com.knoweverything.model.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {
    List<ChatHistory> findTop20ByCategoryOrderByCreatedAtDesc(String category);
    List<ChatHistory> findTop50ByOrderByCreatedAtDesc();
    long countByCategory(String category);
}
