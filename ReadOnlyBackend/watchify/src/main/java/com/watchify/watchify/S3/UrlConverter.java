package com.watchify.watchify.S3;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.UncheckedIOException;
import java.net.MalformedURLException;
import java.net.URL;

@Converter
public class UrlConverter implements AttributeConverter<URL, String> {

    @Override
    public String convertToDatabaseColumn(URL attribute) {
        return attribute.toString();
    }

    @Override
    public URL convertToEntityAttribute(String dbData) {
        try {
            return new URL(dbData);
        } catch (MalformedURLException e) {
            throw new UncheckedIOException(e);
        }
    }
}
