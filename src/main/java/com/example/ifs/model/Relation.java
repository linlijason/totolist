package com.example.ifs.model;

import java.util.Objects;

public final class Relation {
    public enum Kind {
        HAS_ONE, HAS_MANY, BELONGS_TO, MANY_TO_MANY
    }

    private final String leftEntity;
    private final Kind kind;
    private final String rightEntity;
    private final String mappedBy; // nullable
    private final String alias;    // nullable (from 'as')

    public Relation(String leftEntity, Kind kind, String rightEntity, String mappedBy, String alias) {
        this.leftEntity = Objects.requireNonNull(leftEntity, "leftEntity");
        this.kind = Objects.requireNonNull(kind, "kind");
        this.rightEntity = Objects.requireNonNull(rightEntity, "rightEntity");
        this.mappedBy = mappedBy;
        this.alias = alias;
    }

    public String getLeftEntity() {
        return leftEntity;
    }

    public Kind getKind() {
        return kind;
    }

    public String getRightEntity() {
        return rightEntity;
    }

    public String getMappedBy() {
        return mappedBy;
    }

    public String getAlias() {
        return alias;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("relation ").append(leftEntity).append(' ');
        switch (kind) {
            case HAS_ONE -> sb.append("hasOne ");
            case HAS_MANY -> sb.append("hasMany ");
            case BELONGS_TO -> sb.append("belongsTo ");
            case MANY_TO_MANY -> sb.append("manyToMany ");
        }
        sb.append(rightEntity);
        if (mappedBy != null) sb.append(" mappedBy ").append(mappedBy);
        if (alias != null) sb.append(" as ").append(alias);
        return sb.toString();
    }
}