package org.example.dao;

import org.example.components.PaginationResults;
import org.example.models.Letter;

import java.util.List;

public interface ILetterDao {
    void addLetter(Letter letter);
    PaginationResults<Letter> getLetters(int page);
    Letter getLetter(int id);
    void updateLetter(Letter letter);
}
