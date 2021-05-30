package org.example.dao;

import org.example.components.PaginationResults;
import org.example.models.Letter;
import org.hibernate.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Locale;


@Component
public class LetterDao implements ILetterDao{
    private final int per_page;
    private SessionFactory sessionFactory;
    private MessageSource messageSource;
    private PaginationResults<Letter> paginationResults;

    @Autowired
    public void setPaginationResults(PaginationResults paginationResults) {
        this.paginationResults = paginationResults;
    }

    @Autowired
    LetterDao(MessageSource messageSource){
        this.messageSource = messageSource;
        this.per_page = Integer.parseInt(this.messageSource.getMessage("admin.letters.per_page", null, Locale.ENGLISH));
    }

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addLetter(Letter letter) {
        Session session = this.sessionFactory.getCurrentSession();
        session.persist(letter);
    }

    @Override
    public PaginationResults<Letter> getLetters(int page) {
        Session session = this.sessionFactory.getCurrentSession();
        Criteria sqlQuery = session.createCriteria(Letter.class);

        this.paginationResults.setPerPage(5);
        this.paginationResults.setPage(page);
        this.paginationResults.paginate(sqlQuery);

        return this.paginationResults;
    }

    @Override
    public Letter getLetter(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        return session.get(Letter.class,id);
    }

    @Override
    public void updateLetter(Letter letter) {
        Session session = this.sessionFactory.getCurrentSession();
        session.update(letter);
    }
}
