package org.example.interceptors;

import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SetupFolders implements HandlerInterceptor {
    private final Path DEST_FOLDER = Paths.get("../webapps/ROOT/resources/images");


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        try{
            if(!Files.exists(DEST_FOLDER)){
                Files.createDirectories(DEST_FOLDER);
            }
        } catch (Throwable ex){
            ex.printStackTrace();
        }

        return true;
    }
}
