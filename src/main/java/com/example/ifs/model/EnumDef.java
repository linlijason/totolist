package com.example.ifs.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class EnumDef {
    private final String name;
    private final List<String> values;

    public EnumDef(String name, List<String> values) {
        this.name = Objects.requireNonNull(name, "name");
        this.values = values == null ? List.of() : List.copyOf(values);
    }

    public String getName() {
        return name;
    }

    public List<String> getValues() {
        return values;
    }

    @Override
    public String toString() {
        return "enum " + name + " { " + String.join(", ", values) + " }";
    }
}