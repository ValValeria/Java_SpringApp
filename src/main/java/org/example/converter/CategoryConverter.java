package org.example.converter;

import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.core.convert.converter.Converter;
import java.util.ArrayList;
import java.util.List;


public class CategoryConverter implements Converter<JSONArray, List> {

    @Override
    public List<String> convert(JSONArray jsonArray) {
        List<String> results = new ArrayList<>();

        for (int i = 0; i < jsonArray.length(); i++) {
            try {
                String cat = jsonArray.getString(i);

                if(!results.contains(cat)){
                    results.add(cat);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return results;
    }
}
