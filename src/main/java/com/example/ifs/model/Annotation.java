package com.example.ifs.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class Annotation {
    private final String name;
    private final List<String> args;

    public Annotation(String name, List<String> args) {
        this.name = Objects.requireNonNull(name, "name");
        this.args = args == null ? List.of() : List.copyOf(args);
    }

    public String getName() {
        return name;
    }

    public List<String> getArgs() {
        return args;
    }

    @Override
    public String toString() {
        if (args.isEmpty()) return "@" + name;
        return "@" + name + "(" + String.join(", ", args) + ")";
    }
}