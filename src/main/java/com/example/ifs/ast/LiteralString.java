package com.example.ifs.ast;

import java.util.Objects;

public final class LiteralString implements Expression {
    private final String value;

    public LiteralString(String value) {
        this.value = Objects.requireNonNull(value, "value");
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return '"' + value.replace("\"", "\\\"") + '"';
    }
}