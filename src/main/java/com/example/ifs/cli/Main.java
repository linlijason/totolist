package com.example.ifs.cli;

import com.example.ifs.IfsParserFacade;
import com.example.ifs.model.Model;

import java.nio.file.Path;

public final class Main {
    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            System.err.println("Usage: java Main <path-to-ifsml>");
            System.exit(1);
        }
        Path path = Path.of(args[0]);
        Model model = IfsParserFacade.parseFile(path);
        System.out.println(model);
    }
}