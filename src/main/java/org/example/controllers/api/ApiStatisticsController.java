package org.example.controllers.api;

import org.example.components.ObjectApiResponse;
import org.example.models.StaticInfo;
import org.example.service.StaticDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Produces;
import java.security.Principal;
import java.util.List;


@Controller
@RequestMapping("/api/statistics")
@CrossOrigin
@Produces("application/json")
public class ApiStatisticsController {
    private StaticDataService staticDataService;
    private ObjectApiResponse objectApiResponse;

    @Autowired
    public void setObjectApiResponse(ObjectApiResponse objectApiResponse) {
        this.objectApiResponse = objectApiResponse;
    }

    @Autowired
    public void setStaticDataService(StaticDataService staticDataService) {
        this.staticDataService = staticDataService;
    }

    @GetMapping("/**")
    @ResponseBody
    private String index(Principal principal, HttpServletResponse httpServletResponse){
        if(principal == null){
             httpServletResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
        } else {
            List<StaticInfo> results = staticDataService.viewStatics();
            this.objectApiResponse.setData(results);
        }

        return this.objectApiResponse.toString();
    }
}
