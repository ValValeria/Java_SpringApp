package org.example.controllers.api;

import org.example.components.ObjectApiResponse;
import org.example.models.User;
import org.example.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.ws.rs.Produces;
import java.util.Map;

@Controller
@CrossOrigin
@RequestMapping("/api/")
public class ApiLoginController {
    private final AuthService authService;
    private final ObjectApiResponse objectApiResponse;

    @Autowired
    ApiLoginController(AuthService authService, ObjectApiResponse objectApiResponse1) {
        this.authService = authService;
        this.objectApiResponse = objectApiResponse1;
    }

    @RequestMapping(value="/login", method = RequestMethod.POST)
    @ResponseBody
    @Produces("application/json")
    private String login(HttpServletRequest request, @Valid User user, BindingResult bindingResult) {
        this.objectApiResponse.clearObject();

        if(bindingResult.hasErrors()){
            boolean isUserExists = authService.login(user.getUsername(),user.getPassword());

            if(!isUserExists){
                this.objectApiResponse.addErrors("The user doesn't exist in our database");
            } else{
                this.objectApiResponse.setStatus("admin");
                this.objectApiResponse.setData(Map.of("id", authService.getUserId()));
            }
        } else{
            this.objectApiResponse.addErrors("Invalid data");
        }

        return this.objectApiResponse.toString();
    }
}
