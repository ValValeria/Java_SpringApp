package org.example.controllers.admin;

import org.example.models.User;
import org.example.service.AuthService;
import org.example.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.DataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Controller
@ControllerAdvice
@RequestMapping("/auth/")
public class AdminAuthController {
    private AuthService authService;
    private UserValidator userValidator;

    @Autowired
    public void setAuthService(AuthService authService) {
        this.authService = authService;
    }

    @Autowired
    public void setUserValidator(UserValidator userValidator){
        this.userValidator = userValidator;
    }

    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("user", new User());
    }

    @RequestMapping(value="/login",method = RequestMethod.GET)
    private String index(Authentication authentication){
        if(authentication != null && authentication.isAuthenticated()){
            return "redirect:/admin";
        }

        return "login";
    }

    @PostMapping(value="/authenticate")
    private void  login( HttpServletRequest httpServletRequest,
                         HttpServletResponse httpServletResponse,
                         @ModelAttribute("user") User user,
                         Authentication authentication) throws IOException {
        String successUrl = "/admin/";

        if(authentication == null){
            DataBinder dataBinder = new DataBinder(user);
            dataBinder.setValidator(userValidator);
            dataBinder.validate();

            String baseUrl = String.format("%s://%s:%d",
                                           httpServletRequest.getScheme(),
                                           httpServletRequest.getServerName(),
                                           httpServletRequest.getServerPort());
            DefaultUriBuilderFactory uriBuilderFactory = new DefaultUriBuilderFactory(baseUrl);

            if(dataBinder.getBindingResult().hasErrors()){
               UriBuilder uriBuilder = uriBuilderFactory.uriString("/auth/login").queryParam("inputError", true);

               httpServletResponse.sendRedirect(uriBuilder.build().toString());
            } else {
               boolean isUserExists = this.authService.login(user.getUsername(), user.getPassword());
               String redirectUrl;

               if(!isUserExists){
                 redirectUrl = uriBuilderFactory.uriString("/auth/login").queryParam("error", true).build().toString();
               } else{
                 redirectUrl = uriBuilderFactory.uriString("/admin/").build().toString();
               }

               httpServletResponse.sendRedirect(redirectUrl);
           }
       } else{
            httpServletResponse.sendRedirect(successUrl);
       }
    }
}
