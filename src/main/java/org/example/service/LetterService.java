package org.example.service;

import org.example.components.PaginationResults;
import org.example.dao.ILetterDao;
import org.example.dao.LetterDao;
import org.example.models.Letter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Component
public class LetterService implements ILetterDao {
    private LetterDao letterDao;

    @Autowired
    public void setLetterDao(LetterDao letterDao) {
        this.letterDao = letterDao;
    }

    @Transactional
    public void addLetter(Letter letter){
        this.letterDao.addLetter(letter);
    }

    @Transactional
    public PaginationResults<Letter> getLetters(int page) {
        return letterDao.getLetters(page);
    }

    @Transactional
    public Letter getLetter(int id) {
        return letterDao.getLetter(id);
    }

    @Transactional
    public void updateLetter(Letter letter) {
       letterDao.updateLetter(letter);
    }
}
