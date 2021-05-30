package org.example.validation;

public class Validate {
    public static String getErrorMessage(String field){
        return String.format("Invalid field,named %s",field);
    }
}
