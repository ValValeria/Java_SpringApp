package org.example.dao;

import org.example.components.PaginationResults;
import org.example.models.Post;

import java.util.List;

public interface IPostDao {
    List<String> getCategories();
    PaginationResults<Post> sort(String sortBy, String value, int page, int perPage);
    PaginationResults<Post> getPosts(int perPage, int page, int[] excludedIds);
    PaginationResults<Post> searchForPosts(String txt, int perPage, int page, String category);
    void deletePost(int id);
    void updatePost(Post post);
}
