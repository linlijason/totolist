package com.example.ifs.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class Entity {
    private final String name;
    private final List<Attribute> attributes;

    public Entity(String name, List<Attribute> attributes) {
        this.name = Objects.requireNonNull(name, "name");
        this.attributes = attributes == null ? List.of() : List.copyOf(attributes);
    }

    public String getName() {
        return name;
    }

    public List<Attribute> getAttributes() {
        return attributes;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("entity ").append(name).append(" {\n");
        for (Attribute attribute : attributes) {
            sb.append("  ").append(attribute).append("\n");
        }
        sb.append("}");
        return sb.toString();
    }
}