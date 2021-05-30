package org.example.dao;


import org.example.components.PaginationResults;
import org.example.models.Post;
import org.hibernate.*;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;


@Component
public class PostDao implements IPostDao{
    private SessionFactory sessionFactory;
    private PaginationResults paginationResults;

    @Autowired
    PostDao(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    @Autowired
    public void setPaginationResults(PaginationResults paginationResults) {
        this.paginationResults = paginationResults;
    }

    private Session getCurrentSession(){
        Session session;

        try {
            session = sessionFactory.getCurrentSession();
        } catch (HibernateException e) {
            session = sessionFactory.openSession();
        }

        return session;
    }

    public void addPost(Post post){
        getCurrentSession().save(post);
    }

    public PaginationResults<Post> getPosts(int perPage, int page, int[] excludedIds){
        Session session = getCurrentSession();
        Criteria criteria = session.createCriteria(Post.class);
        criteria.addOrder(Order.asc("id"));

        this.paginationResults.setPage(page);
        this.paginationResults.setPerPage(perPage);

        for (int excludedId: excludedIds) {
            criteria.add(Restrictions.ne("id",excludedId));
        }

        this.paginationResults.paginate(criteria);

        return this.paginationResults;
    }

    public PaginationResults<Post> searchForPosts(String txt, int perPage, int page, String category){
        Session session = getCurrentSession();
        Criteria criteria = session.createCriteria(Post.class);
        criteria.add(Restrictions.ilike("title","%"+txt+"%"));

        if(category!=null){
            criteria.add(Restrictions.ilike("category","%"+category+"%"));
        }

        this.paginationResults.setPerPage(perPage);
        this.paginationResults.setPage(page);
        this.paginationResults.paginate(criteria);

        return this.paginationResults;
    }

    @Override
    public void deletePost(int id) {
        Session session = getCurrentSession();
        Post post = session.load(Post.class, id);
        session.delete(post);
        session.flush();
    }

    @Override
    public void updatePost(Post post){
        Session session = getCurrentSession();
        session.update(post);
    }

    public Post getPost(int id){
        return getCurrentSession().get(Post.class,id);
    }

    @Override
    public List<String> getCategories() {
        Session session = getCurrentSession();
        Query query = session.createQuery("SELECT distinct P.category FROM Post P");
        return query.list();
    }

    @Override
    public PaginationResults<Post> sort(String sortBy, String value, int page, int perPage) {
        Criteria criteria = getCurrentSession().createCriteria(Post.class);

        if(sortBy.equals("category")){
            criteria.add(Restrictions.like("category","%"+value+"%"));
        }

        this.paginationResults.setPage(page);
        this.paginationResults.setPerPage(perPage);
        this.paginationResults.paginate(criteria);

        return this.paginationResults;
    }
}
