package org.example.controllers.files;

import org.example.converter.DateConverter;
import org.example.models.StaticInfo;
import org.example.service.StaticDataService;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;


@Controller
@CrossOrigin
public class TemplateServeController{
    private StaticDataService staticDataService;
    private final String[] FORBIDDEN_URLS = new String[]{"/api","/public","/uploads"};

    @Autowired
    public void setStaticDataService(StaticDataService staticDataService) {
        this.staticDataService = staticDataService;
    }


    @GetMapping(value = "/**", headers = "Sec-Fetch-Dest=document")
    private ModelAndView index(HttpServletRequest request) throws JSONException {
        this.addStatics(request);

        return new ModelAndView("index");
    }

    private void addStatics(HttpServletRequest request) throws JSONException {
        String url = request.getPathInfo();

        if(!Arrays.asList(FORBIDDEN_URLS).contains(url)){
            String time = new DateConverter().convert(new Date());
            StaticInfo staticInfo = this.staticDataService.viewLastStatic(time);
            String ip = request.getRemoteAddr();
            JSONArray ips = new JSONArray();

            if(staticInfo == null){
                staticInfo = new StaticInfo();
                staticInfo.setDate(time);
                staticInfo.setVisits(1);

                ips.put(ip);
                staticInfo.setIps(ips.toString());

                staticDataService.addStatics(staticInfo);
            } else{
                JSONArray jsonArray = new JSONArray(staticInfo.getIps());
                HashSet<String> hashSet = new HashSet<>();

                for (int i = 0; i < jsonArray.length(); i++) {
                    String fieldIp = jsonArray.getString(i);
                    hashSet.add(fieldIp);
                }

                if(!hashSet.contains(ip)){
                    jsonArray.put(ip);
                }

                int prevVisits = staticInfo.getVisits();
                staticInfo.setVisits(prevVisits+1);
                staticInfo.setIps(jsonArray.toString());

                staticDataService.updateStatic(staticInfo);
            }
        }
    }
}
