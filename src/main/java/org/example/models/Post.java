package org.example.models;

import com.fasterxml.jackson.annotation.JsonValue;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.DefaultUriBuilderFactory;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;


@Entity
@Table(name="java_post",schema="1oASotOvGd")
public class Post {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="title",length=30)
    @Size(min=10,max=30, message = "Please check the size of title")
    @NotNull
    private String title;

    @Column(name="description",length=100)
    @Size(min=10,max=100, message = "Please check the size of description")
    @NotNull
    private String description;

    @Lob
    @Column(name="image", columnDefinition="BLOB")
    private byte[] image;

    @Column(name="category",length = 60)
    @Size(min=10,max=60, message = "Please check the size of category")
    @NotNull
    private String category;

    @Column(name="content",length = 900)
    @Size(min=10,max=900, message = "Please check the size of content")
    @NotNull
    private String content;

    @Column(name="contentList")
    @Size(min=10,max=90)
    private String contentList;

    @Column(name="imageType")
    private String imageType;

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    @JsonValue
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @JsonValue
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] retrieveImage() {
        return image;
    }

    public String getImage(){
        String baseUrl = "http://localhost:8080";
        DefaultUriBuilderFactory uriBuilderFactory = new DefaultUriBuilderFactory(baseUrl);

        URI uri = uriBuilderFactory.uriString("/upload/image/{id}")
                .build(this.id);

        return uri.toString();
    }
    
    public void setImage(MultipartFile multipartFile){
        try {
            this.image = IOUtils.toByteArray(multipartFile.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @JsonValue
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @JsonValue
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @JsonValue
    public String getContentList() {
        return this.contentList;
    }

    public void setContentList(String contentList) {
        this.contentList = contentList;
    }
}
