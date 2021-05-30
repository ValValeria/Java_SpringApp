package org.example.components;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@Scope("prototype")
public class PaginationResults<E> {
      private int perPage, page, allResults, totalPages;
      private List<E> results;
      private SessionFactory sessionFactory;

      @Autowired
      public void setSessionFactory(SessionFactory sessionFactory) {
            this.sessionFactory = sessionFactory;
      }

      /**
       * Fulfill pagination
       * @param query hibernate query
       */
      public void paginate(Criteria query){
           int offset = perPage * (page-1);

           query.setFirstResult(offset);
           query.setMaxResults(perPage);

           this.results = query.list();

           if(this.results != null && this.results.size() >= 1){
              this.loadNumPages((Class<E>) this.results.get(0).getClass());
           }
      }

      private void loadNumPages(Class<E> aClass) {
            Criteria criteria1 = sessionFactory.getCurrentSession().createCriteria(aClass);
            criteria1.setProjection(Projections.rowCount());

            this.allResults = ((Number)criteria1.setProjection(Projections.rowCount()).uniqueResult()).intValue();

            this.calculateTotalPages();
      }

      private void calculateTotalPages() {
            totalPages = (int) Math.ceil((float) allResults / (float) perPage);
      }

      public int getPerPage() {
            return perPage;
      }

      public void setPerPage(int perPage) {
            this.perPage = perPage;
      }

      public int getPage() {
            return page;
      }

      public void setPage(int page) {
            this.page = page;
      }

      public int getAllResults() {
            return allResults;
      }

      public int getTotalPages() {
            return totalPages;
      }

      public void setTotalPages(int totalPages) {
            this.totalPages = totalPages;
      }

      public List<E> getResults() {
            return results;
      }

      public void setResults(List<E> results) {
            this.results = results;
      }
}
