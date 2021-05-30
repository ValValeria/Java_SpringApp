package org.example.validation;

import org.example.models.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        User user = (User) o;
        String username = user.getUsername();
        String password = user.getPassword();

        ValidationUtils.rejectIfEmptyOrWhitespace(errors,"password","password.empty");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors,"username","username.empty");

        if(username != null && password != null){
            if (password.length() > 30 || password.length() < 10) {
                errors.rejectValue("password", null, "Please check the length of password");
            } else if (username.length() > 30 || username.length() < 10) {
                errors.rejectValue("username", null, "Invalid username");
            }
        }
    }
}
