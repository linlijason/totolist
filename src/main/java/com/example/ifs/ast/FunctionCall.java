package com.example.ifs.ast;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class FunctionCall implements Expression {
    private final String name;
    private final List<Expression> args;

    public FunctionCall(String name, List<Expression> args) {
        this.name = Objects.requireNonNull(name, "name");
        this.args = args == null ? List.of() : List.copyOf(args);
    }

    public String getName() {
        return name;
    }

    public List<Expression> getArgs() {
        return args;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(name).append('(');
        for (int i = 0; i < args.size(); i++) {
            if (i > 0) sb.append(", ");
            sb.append(args.get(i));
        }
        sb.append(')');
        return sb.toString();
    }
}