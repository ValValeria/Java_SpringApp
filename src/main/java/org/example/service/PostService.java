package org.example.service;

import org.example.components.ObjectApiResponse;
import org.example.components.PaginationResults;
import org.example.dao.IPostDao;
import org.example.dao.PostDao;
import org.example.models.Post;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;
import java.util.stream.IntStream;


@Service
public class PostService implements IPostDao {
    public final ObjectApiResponse objectApiResponse;
    private final PostDao postDao;

    @Autowired
    PostService(ObjectApiResponse obj, PostDao postDao){
        this.postDao = postDao;
        this.objectApiResponse = obj;
    }

    @Transactional
    public void addPost(Post post) throws IOException {
        postDao.addPost(post);
    }

    @Transactional
    public Post getPost(int id){
        return this.postDao.getPost(id);
    }

    @Transactional
    public PaginationResults<Post> searchForPosts(String txt, int perPage, int page, String category){
        return this.postDao.searchForPosts(txt, perPage, page, category);
    }

    @Transactional
    @Override
    public void deletePost(int id) {
        this.postDao.deletePost(id);
    }

    @Transactional
    @Override
    public void updatePost(Post post) {
        this.postDao.updatePost(post);
    }

    @Transactional
    @Cacheable("categories")
    @Override
    public List<String> getCategories() {
        List<String> data = this.postDao.getCategories();
        List<String> result = new LinkedList<>();

        data.forEach(v->{
            try {
                JSONArray jsonArray = new JSONArray(v);

                IntStream.range(0,jsonArray.length())
                        .boxed()
                        .map(v1-> {
                            try {
                                return jsonArray.getString(v1);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            return "";
                        })
                        .filter(str->!result.contains(str))
                        .forEach(v1->{
                            result.add(v1);
                            System.out.println(v1);
                        });

            } catch (Throwable e) {
                e.printStackTrace();
            }
        });

        return result;
    }

    @Transactional
    @Cacheable("posts")
    @Override
    public PaginationResults<Post> sort(String sortBy, String value, int page, int perPage) {
        return postDao.sort(sortBy, value, page, perPage);
    }

    @Transactional
    @Override
    @Cacheable("posts")
    public PaginationResults<Post> getPosts(int perPage, int page, int[] excludedIds) {
        return postDao.getPosts(perPage, page, excludedIds);
    }

    @Transactional
    @Cacheable("posts")
    public PaginationResults<Post> getPosts(int perPage, int page, Set<Integer> excludedIds) {
        int[] excludedInt = new int[excludedIds.size()];
        List<Integer> integerList = new ArrayList<>(excludedIds);

        excludedIds.forEach(v->{
            try{
                excludedInt[integerList.indexOf(v)] = v;
            } catch(Throwable ex){
                ex.printStackTrace();
            }
        });

        return postDao.getPosts(perPage, page, excludedInt);
    }
}
