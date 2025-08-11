package com.example.ifs.ast;

public final class LiteralNumber implements Expression {
    private final String raw;

    public LiteralNumber(String raw) {
        this.raw = raw;
    }

    public String getRaw() {
        return raw;
    }

    @Override
    public String toString() {
        return raw;
    }
}