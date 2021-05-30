package org.example.controllers.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.example.components.ObjectApiResponse;
import org.example.components.PaginationResults;
import org.example.models.Post;
import org.example.service.PostService;
import org.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Produces;
import java.util.*;


@Controller
@RequestMapping("/api/blog")
@ResponseBody
@Produces("application/json")
@CrossOrigin
public class ApiSortProductsController {
    private final PostService postService;
    public final ObjectApiResponse objectApiResponse;
    private final Map<String, List<String>> allowedSort = new LinkedHashMap<>();

    @Inject
    ApiSortProductsController(PostService postService, ObjectApiResponse obj) {
        this.postService = postService;
        this.objectApiResponse = obj;

        this.loadCategories();
    }

    @GetMapping("/categories")
    private String categoriesList(){
        this.objectApiResponse.clearObject();
        this.objectApiResponse.setData(allowedSort.getOrDefault("category",List.of()));
        return this.objectApiResponse.toString();
    }

    @GetMapping("/sort/{sortBy}/{sortByValue}")
    private String sort(@PathVariable String sortBy,
                        @RequestParam(required=false, value="1") int page,
                        @RequestParam(required = false, value="3") int perPage,
                        @PathVariable String sortByValue,
                        HttpServletResponse response){
        this.objectApiResponse.clearObject();

        if(!allowedSort.containsKey(sortBy)){
            this.objectApiResponse.addErrors("Invalid query");
        } else if(!allowedSort.get(sortBy).contains(sortByValue)){
            this.objectApiResponse.addErrors("Invalid value of query");
        } else{
            PaginationResults<Post> results = postService.sort(sortBy,sortByValue, page, perPage);
            this.objectApiResponse.setData(results);
        }

        Gson gson = new GsonBuilder().disableHtmlEscaping().create();

        response.setCharacterEncoding("UTF8");

        return gson.toJson(this.objectApiResponse);
    }

    /**
     * Loads categories
     */
    public void loadCategories(){
        List<String> results = this.allowedSort.getOrDefault("category", List.of());

        if(results.size() == 0){
            List<String> categories = this.postService.getCategories();
            this.allowedSort.put("category", categories);
        }
    }
}
