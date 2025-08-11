package com.example.ifs;

import com.example.ifs.model.Model;
import com.example.ifs.parse.Lexer;
import com.example.ifs.parse.Parser;
import com.example.ifs.parse.Token;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public final class IfsParserFacade {
    public static Model parseString(String source) {
        Lexer lexer = new Lexer(source);
        List<Token> tokens = lexer.tokenize();
        Parser parser = new Parser(tokens);
        return parser.parseModel();
    }

    public static Model parseFile(Path path) throws IOException {
        String source = Files.readString(path, StandardCharsets.UTF_8);
        return parseString(source);
    }
}