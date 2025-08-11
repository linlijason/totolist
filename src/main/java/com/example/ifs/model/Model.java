package com.example.ifs.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class Model {
    private final String name; // optional, may be null
    private final String namespace; // optional, may be null
    private final List<EnumDef> enums;
    private final List<Entity> entities;
    private final List<Relation> relations;

    public Model(String name, String namespace, List<EnumDef> enums, List<Entity> entities, List<Relation> relations) {
        this.name = name;
        this.namespace = namespace;
        this.enums = enums == null ? List.of() : List.copyOf(enums);
        this.entities = entities == null ? List.of() : List.copyOf(entities);
        this.relations = relations == null ? List.of() : List.copyOf(relations);
    }

    public String getName() {
        return name;
    }

    public String getNamespace() {
        return namespace;
    }

    public List<EnumDef> getEnums() {
        return enums;
    }

    public List<Entity> getEntities() {
        return entities;
    }

    public List<Relation> getRelations() {
        return relations;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        if (name != null) sb.append("model \"").append(name).append("\"\n");
        if (namespace != null) sb.append("namespace ").append(namespace).append("\n\n");
        for (EnumDef e : enums) {
            sb.append(e).append("\n\n");
        }
        for (Entity e : entities) {
            sb.append(e).append("\n\n");
        }
        for (Relation r : relations) {
            sb.append(r).append("\n");
        }
        return sb.toString();
    }
}