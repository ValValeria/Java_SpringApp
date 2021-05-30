package org.example.controllers.api;

import org.example.components.PaginationResults;
import org.example.models.Letter;
import org.example.service.LetterService;
import org.example.components.ObjectApiResponse;
import org.example.validation.Validate;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.ws.rs.Produces;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Controller
@RequestMapping(value="/api")
@Produces("application/json")
@ResponseBody
@CrossOrigin
public class ApiContactController {
    private ObjectApiResponse objectApiResponseResponse;
    private final LetterService letterService;

    @Autowired
    public ApiContactController(LetterService letterService) {
        this.letterService = letterService;
    }

    @Autowired
    public void setObjectApiResponseResponse(ObjectApiResponse objectApiResponseResponse) {
        this.objectApiResponseResponse = objectApiResponseResponse;
    }

    @PostMapping(value = "/addLetter")
    private String addLetter(@Valid Letter letter, BindingResult results){
        this.objectApiResponseResponse.clearObject();

        if(!results.hasErrors()){
            Date date = new Date();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy.MM.dd hh:mm:ss");
            letter.setDate(simpleDateFormat.format(date));
            letterService.addLetter(letter);
            objectApiResponseResponse.setStatus("ok");
        }
        return objectApiResponseResponse.toString();
    }

    @GetMapping(value="/update/letter/{id}")
    @PreAuthorize("hasAnyRole('admin')")
    public String updateLetter(@PathVariable int id,@RequestParam String status){
        this.objectApiResponseResponse.clearObject();

        Letter letter = letterService.getLetter(id);

        if(letter!=null){
            letter.setStatus(status);
            letterService.updateLetter(letter);
            objectApiResponseResponse.setStatus("ok");
        }

        return objectApiResponseResponse.toString();
    }

    @GetMapping(value="/letter/{id}")
    @PreAuthorize("hasAnyRole('admin')")
    public String viewLetter(@PathVariable int id){
        this.objectApiResponseResponse.clearObject();

        Letter letter = letterService.getLetter(id);

        if(letter != null){
            objectApiResponseResponse.setData(letter);
        }

        return objectApiResponseResponse.toString();
    }

    @GetMapping(value="/letters")
    @PreAuthorize("hasAnyRole('admin')")
    public String viewLetters(@RequestParam @Min(1) int page){
        this.objectApiResponseResponse.clearObject();

        PaginationResults<Letter> letterList = letterService.getLetters(page);

        if(letterList != null){
            objectApiResponseResponse.setData(letterList);
        }

        JSONObject jsonObject = new JSONObject(objectApiResponseResponse);

        return jsonObject.toString();
    }

    /**
     * Handles exceptions
     * @return
     */
    @ExceptionHandler(Throwable.class)
    public ResponseEntity<String> error(Throwable throwable){
        throwable.printStackTrace();
        this.objectApiResponseResponse.clearObject();
        this.objectApiResponseResponse.addErrors("Some errors has occurred");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(this.objectApiResponseResponse.toString());
    }
}