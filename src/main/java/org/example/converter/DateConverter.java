package org.example.converter;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.core.convert.converter.Converter;

public final class DateConverter implements Converter<Date, String> {
    private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public String convert(Date source) {
        return format.format(source);
    }
}
