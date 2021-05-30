package org.example.controllers.files;

import org.example.models.Post;
import org.example.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.TreeMap;

@Controller
@RequestMapping("/upload/image")
public class UploadsController {
    private final TreeMap<String, String> map = new TreeMap<>();
    private PostService postService;

    UploadsController(){
        this.map.put("svg", "image/svg+xml");
        this.map.put("png", "image/png");
        this.map.put("jpeg", "image/jpeg");
    }

    @Autowired
    void setPostService(PostService postService){
        this.postService = postService;
    }

    @GetMapping("/{id}")
    public void index(@PathVariable int id, PrintWriter printWriter, HttpServletResponse response) throws IOException {
        Post post = this.postService.getPost(id);

        if(post == null){
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        } else{
            int c;
            byte [] image = post.retrieveImage();
            BufferedInputStream bufferedInputStream = new BufferedInputStream(new ByteArrayInputStream(image));

            while((c=bufferedInputStream.read())!=-1){
                printWriter.print((char)c);
            }

            if(bufferedInputStream.available() == 0){
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            } else if(this.map.containsKey(post.getImageType())){
                response.setHeader("Content-Type", this.map.get(post.getImageType()));
            }
        }
    }
}
