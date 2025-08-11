package com.example.ifs.ast;

public final class LiteralBoolean implements Expression {
    private final boolean value;

    public LiteralBoolean(boolean value) {
        this.value = value;
    }

    public boolean getValue() {
        return value;
    }

    @Override
    public String toString() {
        return Boolean.toString(value);
    }
}