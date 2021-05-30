package org.example.controllers.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.components.ObjectApiResponse;
import org.example.components.PaginationResults;
import org.example.models.Post;
import org.example.service.PostService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.NavigableSet;
import java.util.Set;

@Controller
@RequestMapping(value="/api/blog")
@CrossOrigin
public class ApiViewPostsController {
    PostService postService;
    public  ObjectApiResponse objectApiResponse;

    @Autowired
    ApiViewPostsController(ObjectApiResponse obj, PostService postService){
        objectApiResponse = obj;
        this.postService = postService;
    }

    @RequestMapping(value="/post/{id}",method= RequestMethod.GET,produces = "application/json")
    @ResponseBody
    public ResponseEntity<String> getPost(@PathVariable int id) throws JsonProcessingException {
        Post post = postService.getPost(id);

        if(post == null){
            return ResponseEntity.notFound().build();
        }

        objectApiResponse.clearObject();
        objectApiResponse.setData(post);

        JSONObject mapper = new JSONObject(objectApiResponse);

        return ResponseEntity.status(HttpStatus.OK).body(mapper.toString());
    }


    @RequestMapping(value="/posts",method= RequestMethod.GET,produces = "application/json")
    @ResponseBody
    public String getPosts(@RequestParam int page,
                           @RequestParam int per_page,
                           @RequestParam(required = false) Set<Integer> excluded) {
        objectApiResponse.clearObject();

        if(excluded == null){
            excluded = new HashSet<>();
        }

        PaginationResults<Post> posts = postService.getPosts(per_page,page, excluded);
        String result = "{}";

        try {
            objectApiResponse.setData(posts);
            JSONObject mapper = new JSONObject(objectApiResponse);
            result = mapper.toString();
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return result;
    }
}
