package org.example.components;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class ObjectApiResponse {
    private List<String> errors = new ArrayList<>();
    private Object data = new String[]{};
    private String status = "unspecified";

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public String getStatus() {
        return status;
    }

    public void addErrors(String ... errors){
        this.errors.addAll(Arrays.asList(errors));
    }

    public void clearErrors(){
        this.errors.clear();
    }

    public void clearObject(){
        this.clearErrors();
        this.data = "";
        this.status = "";
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString(){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{}";
        }
    }
}
