package com.example.ifs.ast;

import java.util.Objects;

public final class IdentifierRef implements Expression {
    private final String name;

    public IdentifierRef(String name) {
        this.name = Objects.requireNonNull(name, "name");
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return name;
    }
}