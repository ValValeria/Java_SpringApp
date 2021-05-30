package org.example.controllers.admin;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;


@Controller
@RequestMapping("/admin/")
public class AdminHomeController {

    @GetMapping(value="/**")
    @PreAuthorize("hasAnyRole('admin') and isAuthenticated()")
    private String index(){
        return "admin/index";
    }

    @GetMapping(value="/logout")
    private String logout(HttpServletRequest httpServletRequest){
        SecurityContextHolder.clearContext();

        HttpSession session = httpServletRequest.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return "redirect:/auth/login";
    }
}
