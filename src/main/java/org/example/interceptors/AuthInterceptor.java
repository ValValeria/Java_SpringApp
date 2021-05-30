package org.example.interceptors;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.service.AuthService;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor, ApplicationContextAware
{
    private AuthService authService;
    private final String SECRET_KEY_VALUE = "hdgdy765hjksk(876sHgFFSH";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        try{
            final String authHeader = request.getHeader("Auth");
            final String SECRET_KEY = request.getParameter("secret_key");
            final boolean isAdminScriptRequest = request.getRequestURI().startsWith("/public/js/admin.js");

            if(authHeader != null){
               ObjectMapper objectMapper = new ObjectMapper();
               JsonNode jsonNode = objectMapper.readTree(authHeader);
               String username = jsonNode.get("username").asText();
               String password = jsonNode.get("password").asText();

               boolean isAuthenticated = authService.login(username, password);

               if(isAuthenticated && isAdminScriptRequest) return true;
            }

            if(isAdminScriptRequest){
                if(SECRET_KEY != null && SECRET_KEY.equals(SECRET_KEY_VALUE)){
                    return true;
                } else{
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    return false;
                }
            }

        } catch(Throwable exception){
            exception.printStackTrace();
        }

        return true;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.authService = applicationContext.getBean(AuthService.class);
    }
}
