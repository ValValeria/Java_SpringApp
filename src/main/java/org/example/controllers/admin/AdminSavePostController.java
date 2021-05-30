package org.example.controllers.admin;

import org.example.components.ObjectApiResponse;
import org.example.models.Post;
import org.example.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
@RequestMapping(value="/admin/")
@PreAuthorize("hasAnyRole('admin','user')")
@CrossOrigin
public class AdminSavePostController{
    private PostService postService;
    private ObjectApiResponse objectApiResponse;
    private final String[] MEDIA_TYPES = new String[] {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE};


    @Autowired
    AdminSavePostController(ObjectApiResponse obj, PostService postService){
        objectApiResponse = obj;
        this.postService = postService;
        this.objectApiResponse.clearObject();
    }

    /**
     * Handles file upload
     * @return
     * @throws IOException
     */
    @PostMapping(value="/savePost",produces = "application/json", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    private ResponseEntity<String> index(@Valid Post post,
                                         @RequestParam(value="image") MultipartFile image,
                                         BindingResult bindingResult) throws IOException {
        this.objectApiResponse.clearObject();

        if(!bindingResult.hasErrors()){
            String contentType = image.getContentType();
            boolean isAllowedType = Arrays.asList(this.MEDIA_TYPES).contains(contentType);

            if(!isAllowedType){
                objectApiResponse.addErrors("Invalid type of file");
            } else{
                post.setImage(image);
                postService.addPost(post);
                objectApiResponse.setStatus("ok");
            }
        }

        return new ResponseEntity<>(objectApiResponse.toString(), HttpStatus.OK);
    }

    /**
     * Handles exceptions
     * @param {Throwable} ex
     * @return {ResponseEntity<String>}
     */
    @ExceptionHandler(Throwable.class)
    private  ResponseEntity<String> handleAllExceptions(Throwable ex) {
        List<ObjectError> list = new ArrayList<>();

        this.objectApiResponse.clearObject();

        ex.printStackTrace();

        if(ex instanceof MethodArgumentNotValidException){
            list = ((MethodArgumentNotValidException)ex).getBindingResult().getAllErrors();
        } else if(ex instanceof HttpMediaTypeNotSupportedException){
            list.add(new ObjectError("image","Invalid type of file"));
        } else if(ex instanceof BindException){
            BindException exception = (BindException) ex;
            list.addAll(exception.getBindingResult().getAllErrors());
        } else if(ex instanceof MaxUploadSizeExceededException){
            objectApiResponse.addErrors("The maximum size of file is exceeded");
        }

        list.forEach(v->{
            objectApiResponse.addErrors( v.getDefaultMessage());
        });

        return new ResponseEntity<>(objectApiResponse.toString(), HttpStatus.OK);
    }

}
