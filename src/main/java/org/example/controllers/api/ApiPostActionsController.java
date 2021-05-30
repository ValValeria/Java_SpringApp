package org.example.controllers.api;

import org.example.models.Post;
import org.example.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Produces;


@Controller
//@PreAuthorize("hasRole('admin')")
@Produces("application/json")
@ResponseBody
public class ApiPostActionsController {
    @Autowired
    private PostService postService;

    @CrossOrigin
    @RequestMapping(value="/api/blog/delete/{id}", method = RequestMethod.GET)
    private void delete(@PathVariable int id, HttpServletResponse httpServletResponse){
        Post post = this.postService.getPost(id);

        if(post == null){
            httpServletResponse.setStatus(HttpServletResponse.SC_NOT_FOUND);
        } else {
            postService.deletePost(post.getId());
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        }
    }

    @CrossOrigin
    @RequestMapping(value="/api/blog/update/{id}", method = RequestMethod.POST)
    private void update(@PathVariable int id, HttpServletResponse httpServletResponse){
        Post post = postService.getPost(id);

        if(post == null){
            httpServletResponse.setStatus(HttpServletResponse.SC_NOT_FOUND);
        } else {
            postService.updatePost(post);
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        }
    }
}
