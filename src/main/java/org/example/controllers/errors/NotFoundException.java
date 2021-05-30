package org.example.controllers.errors;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@ControllerAdvice
@RequestMapping("/**")
public class NotFoundException {

    @ExceptionHandler
    private ModelAndView index(Exception exception){
        exception.printStackTrace();
        return new ModelAndView("error");
    }
}
