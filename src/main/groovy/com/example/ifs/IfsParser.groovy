package com.example.ifs

import com.example.ifs.model.Model

final class IfsParser {
    static Model parseString(String source) {
        return IfsParserFacade.parseString(source)
    }

    static Model parseFile(File file) {
        return IfsParserFacade.parseFile(file.toPath())
    }
}