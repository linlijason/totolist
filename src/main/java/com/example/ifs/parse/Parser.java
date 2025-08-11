package com.example.ifs.parse;

import com.example.ifs.ast.*;
import com.example.ifs.model.*;

import java.util.ArrayList;
import java.util.List;

public final class Parser {
    private final List<Token> tokens;
    private int pos = 0;

    public Parser(List<Token> tokens) {
        this.tokens = tokens;
    }

    public Model parseModel() {
        String modelName = null;
        String namespace = null;
        List<EnumDef> enums = new ArrayList<>();
        List<Entity> entities = new ArrayList<>();
        List<Relation> relations = new ArrayList<>();

        if (match(TokenType.MODEL)) {
            if (check(TokenType.STRING)) {
                modelName = consume(TokenType.STRING, "Expected model name string").text;
            } else if (check(TokenType.IDENT)) {
                modelName = consume(TokenType.IDENT, "Expected model name identifier").text;
            } else {
                throw error("Expected model name after 'model'");
            }
        }

        // Optional namespace
        if (match(TokenType.NAMESPACE)) {
            namespace = readQualifiedName();
        }

        // Many top-level definitions
        while (!isAtEnd()) {
            if (match(TokenType.ENUM)) {
                enums.add(parseEnum());
            } else if (match(TokenType.ENTITY)) {
                entities.add(parseEntity());
            } else if (match(TokenType.RELATION)) {
                relations.add(parseRelation());
            } else if (check(TokenType.EOF)) {
                break;
            } else {
                throw error("Unexpected token: " + peek());
            }
        }

        return new Model(modelName, namespace, enums, entities, relations);
    }

    private EnumDef parseEnum() {
        String name = consume(TokenType.IDENT, "Expected enum name").text;
        consume(TokenType.LBRACE, "Expected '{' after enum name");
        List<String> values = new ArrayList<>();
        if (!check(TokenType.RBRACE)) {
            do {
                String v = consume(TokenType.IDENT, "Expected enum value identifier").text;
                values.add(v);
            } while (match(TokenType.COMMA));
        }
        consume(TokenType.RBRACE, "Expected '}' to close enum");
        return new EnumDef(name, values);
    }

    private Entity parseEntity() {
        String name = consume(TokenType.IDENT, "Expected entity name").text;
        consume(TokenType.LBRACE, "Expected '{' after entity name");
        List<Attribute> attrs = new ArrayList<>();
        while (!check(TokenType.RBRACE)) {
            attrs.add(parseAttribute());
        }
        consume(TokenType.RBRACE, "Expected '}' to close entity");
        return new Entity(name, attrs);
    }

    private Attribute parseAttribute() {
        String name = consume(TokenType.IDENT, "Expected attribute name").text;
        consume(TokenType.COLON, "Expected ':' after attribute name");
        TypeRef type = parseTypeRef();
        Expression defaultExpr = null;
        if (match(TokenType.EQUALS)) {
            defaultExpr = parseExpression();
        }
        List<Annotation> annotations = new ArrayList<>();
        while (match(TokenType.AT)) {
            annotations.add(parseAnnotation());
        }
        return new Attribute(name, type, defaultExpr, annotations);
    }

    private Annotation parseAnnotation() {
        String name = consume(TokenType.IDENT, "Expected annotation name after '@'").text;
        List<String> args = new ArrayList<>();
        if (match(TokenType.LPAREN)) {
            if (!check(TokenType.RPAREN)) {
                do {
                    // Accept full expression as annotation arg (e.g., now(), "x", 123, foo.bar)
                    Expression expr = parseExpression();
                    args.add(expr.toString());
                } while (match(TokenType.COMMA));
            }
            consume(TokenType.RPAREN, "Expected ')' to close annotation arguments");
        }
        return new Annotation(name, args);
    }

    private Relation parseRelation() {
        String left = consume(TokenType.IDENT, "Expected left entity name").text;
        Relation.Kind kind;
        if (match(TokenType.HASONE)) kind = Relation.Kind.HAS_ONE;
        else if (match(TokenType.HASMANY)) kind = Relation.Kind.HAS_MANY;
        else if (match(TokenType.BELONGSTO)) kind = Relation.Kind.BELONGS_TO;
        else if (match(TokenType.MANYTOMANY)) kind = Relation.Kind.MANY_TO_MANY;
        else throw error("Expected relation kind (hasOne, hasMany, belongsTo, manyToMany)");
        String right = consume(TokenType.IDENT, "Expected right entity name").text;
        String mappedBy = null;
        String alias = null;
        if (match(TokenType.MAPPEDBY)) {
            mappedBy = consume(TokenType.IDENT, "Expected identifier after mappedBy").text;
        }
        if (match(TokenType.AS)) {
            alias = consume(TokenType.IDENT, "Expected alias after 'as'").text;
        }
        return new Relation(left, kind, right, mappedBy, alias);
    }

    private TypeRef parseTypeRef() {
        String name = consume(TokenType.IDENT, "Expected type name").text;
        List<TypeRef> genericArgs = new ArrayList<>();
        if (matchSymbol('<')) {
            do {
                genericArgs.add(parseTypeRef());
            } while (match(TokenType.COMMA));
            consumeSymbol('>', "Expected '>' to close generic arguments");
        }
        List<String> params = new ArrayList<>();
        if (match(TokenType.LPAREN)) {
            if (!check(TokenType.RPAREN)) {
                do {
                    if (match(TokenType.NUMBER)) params.add(previous().text);
                    else if (match(TokenType.STRING)) params.add(previous().text);
                    else params.add(consume(TokenType.IDENT, "Expected type parameter").text);
                } while (match(TokenType.COMMA));
            }
            consume(TokenType.RPAREN, "Expected ')' to close type params");
        }
        boolean nullable = match(TokenType.QUESTION);
        return new TypeRef(name, genericArgs, params, nullable);
    }

    private Expression parseExpression() {
        // Simple expressions: STRING | NUMBER | true | false | null | IDENT (with optional args: func call)
        if (match(TokenType.STRING)) return new LiteralString(previous().text);
        if (match(TokenType.NUMBER)) return new LiteralNumber(previous().text);
        if (match(TokenType.TRUE)) return new LiteralBoolean(true);
        if (match(TokenType.FALSE)) return new LiteralBoolean(false);
        if (match(TokenType.NULL)) return new NullLiteral();
        // Identifier or function call
        String name = readQualifiedName();
        if (match(TokenType.LPAREN)) {
            List<Expression> args = new ArrayList<>();
            if (!check(TokenType.RPAREN)) {
                do {
                    args.add(parseExpression());
                } while (match(TokenType.COMMA));
            }
            consume(TokenType.RPAREN, "Expected ')' after function call args");
            return new FunctionCall(name, args);
        }
        return new IdentifierRef(name);
    }

    private String readQualifiedName() {
        StringBuilder sb = new StringBuilder();
        String first = consume(TokenType.IDENT, "Expected identifier").text;
        sb.append(first);
        while (match(TokenType.DOT)) {
            sb.append('.');
            sb.append(consume(TokenType.IDENT, "Expected identifier after '.'").text);
        }
        return sb.toString();
    }

    // Helpers
    private boolean matchSymbol(char c) {
        if (checkSymbol(c)) { advance(); return true; }
        return false;
    }

    private void consumeSymbol(char c, String message) {
        if (!matchSymbol(c)) throw error(message);
    }

    private boolean checkSymbol(char c) {
        Token t = peek();
        return t.text != null && t.text.length() == 1 && t.text.charAt(0) == c;
    }

    private boolean match(TokenType type) {
        if (check(type)) { advance(); return true; }
        return false;
    }

    private Token consume(TokenType type, String message) {
        if (check(type)) return advance();
        throw error(message + ", found: " + peek());
    }

    private boolean check(TokenType type) { return !isAtEnd() && peek().type == type; }

    private boolean isAtEnd() { return peek().type == TokenType.EOF; }

    private Token advance() { if (!isAtEnd()) pos++; return previous(); }

    private Token peek() { return tokens.get(pos); }

    private Token previous() { return tokens.get(pos - 1); }

    private RuntimeException error(String message) {
        Token t = peek();
        return new RuntimeException(message + " at " + t.line + ":" + t.column);
    }
}