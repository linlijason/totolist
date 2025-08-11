package com.example.ifs.ast;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class TypeRef {
    private final String name;                 // Base type name, e.g., "String", "Decimal"
    private final List<TypeRef> genericArgs;   // Generic type arguments, e.g., Array<String>
    private final List<String> params;         // Parameters like Decimal(10,2) stored as raw tokens
    private final boolean nullable;            // Whether the type is nullable (trailing '?')

    public TypeRef(String name, List<TypeRef> genericArgs, List<String> params, boolean nullable) {
        this.name = Objects.requireNonNull(name, "name");
        this.genericArgs = genericArgs == null ? List.of() : List.copyOf(genericArgs);
        this.params = params == null ? List.of() : List.copyOf(params);
        this.nullable = nullable;
    }

    public static TypeRef simple(String name) {
        return new TypeRef(name, List.of(), List.of(), false);
    }

    public String getName() {
        return name;
    }

    public List<TypeRef> getGenericArgs() {
        return genericArgs;
    }

    public List<String> getParams() {
        return params;
    }

    public boolean isNullable() {
        return nullable;
    }

    public TypeRef withNullable(boolean nullable) {
        if (this.nullable == nullable) return this;
        return new TypeRef(this.name, this.genericArgs, this.params, nullable);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(name);
        if (!genericArgs.isEmpty()) {
            sb.append('<');
            for (int i = 0; i < genericArgs.size(); i++) {
                if (i > 0) sb.append(", ");
                sb.append(genericArgs.get(i));
            }
            sb.append('>');
        }
        if (!params.isEmpty()) {
            sb.append('(');
            for (int i = 0; i < params.size(); i++) {
                if (i > 0) sb.append(", ");
                sb.append(params.get(i));
            }
            sb.append(')');
        }
        if (nullable) sb.append('?');
        return sb.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TypeRef)) return false;
        TypeRef typeRef = (TypeRef) o;
        return nullable == typeRef.nullable && name.equals(typeRef.name) && genericArgs.equals(typeRef.genericArgs) && params.equals(typeRef.params);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, genericArgs, params, nullable);
    }
}