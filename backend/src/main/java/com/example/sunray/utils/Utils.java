package com.example.sunray.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class Utils {

    public static boolean isEmailBlacklisted(String email) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = Utils.class.getClassLoader().getResourceAsStream("blacklist.json");
        List<String> blacklist = mapper.readValue(inputStream, new TypeReference<List<String>>() {});

        for(int i = 0; i < blacklist.size(); i++){
            if (email.contains(blacklist.get(i))){
                return true;
            }
        }

        return false;
    }
}
