package org.example.controllers.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.example.components.ObjectApiResponse;
import org.example.components.PaginationResults;
import org.example.models.Post;
import org.example.service.PostService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Locale;


@Controller
public class ApiSearchController {
    private PostService postService;
    private ObjectApiResponse objectApiResponse;

    @Autowired
    void setUserService(PostService postService, ObjectApiResponse objectApiResponse){
        this.postService = postService;
        this.objectApiResponse = objectApiResponse;
    }

    @RequestMapping(value="/api/search",produces = "application/json", method = RequestMethod.GET)
    @CrossOrigin
    @ResponseBody
    public ResponseEntity<String> index(@RequestParam String search,
                                        @RequestParam int per_page,
                                        @RequestParam(required = false) String category,
                                        @RequestParam int page) throws JSONException {
        this.objectApiResponse.clearObject();

        String txt = search.trim().toLowerCase(Locale.ROOT);

        if(txt.length()>1){
            PaginationResults<Post> posts = this.postService.searchForPosts(txt, per_page, page, category);
            this.objectApiResponse.setData(posts);
        } else{
            this.objectApiResponse.addErrors("Invalid query");
        }

        Gson gson = new GsonBuilder().disableHtmlEscaping().create();

        return new ResponseEntity<>( gson.toJson(this.objectApiResponse), HttpStatus.OK);
    }
}
