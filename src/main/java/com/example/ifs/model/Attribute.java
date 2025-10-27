package com.example.ifs.model;

import com.example.ifs.ast.Expression;
import com.example.ifs.ast.TypeRef;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class Attribute {
    private final String name;
    private final TypeRef type;
    private final Expression defaultValue; // nullable
    private final List<Annotation> annotations;

    public Attribute(String name, TypeRef type, Expression defaultValue, List<Annotation> annotations) {
        this.name = Objects.requireNonNull(name, "name");
        this.type = Objects.requireNonNull(type, "type");
        this.defaultValue = defaultValue; // may be null
        this.annotations = annotations == null ? List.of() : List.copyOf(annotations);
    }

    public String getName() {
        return name;
    }

    public TypeRef getType() {
        return type;
    }

    public Expression getDefaultValue() {
        return defaultValue;
    }

    public List<Annotation> getAnnotations() {
        return annotations;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(name).append(": ").append(type);
        if (defaultValue != null) sb.append(" = ").append(defaultValue);
        if (!annotations.isEmpty()) {
            sb.append(' ');
            for (int i = 0; i < annotations.size(); i++) {
                if (i > 0) sb.append(' ');
                sb.append(annotations.get(i));
            }
        }
        return sb.toString();
    }
}