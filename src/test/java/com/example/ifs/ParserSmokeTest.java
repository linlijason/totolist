package com.example.ifs;

import com.example.ifs.model.Model;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class ParserSmokeTest {
    public static void main(String[] args) throws Exception {
        Path sample = Path.of("src/test/resources/sample.ifsml");
        String src = Files.readString(sample, StandardCharsets.UTF_8);
        Model model = IfsParserFacade.parseString(src);
        System.out.println("Parsed model name: " + model.getName());
        System.out.println("Entities: " + model.getEntities().size());
        System.out.println("Enums: " + model.getEnums().size());
        System.out.println("Relations: " + model.getRelations().size());
    }
}