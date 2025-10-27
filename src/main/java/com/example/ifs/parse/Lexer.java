package com.example.ifs.parse;

import java.util.ArrayList;
import java.util.List;

public final class Lexer {
    private final String input;
    private final int length;
    private int index = 0;
    private int line = 1;
    private int column = 1;

    public Lexer(String input) {
        this.input = input == null ? "" : input;
        this.length = this.input.length();
    }

    public List<Token> tokenize() {
        List<Token> tokens = new ArrayList<>();
        Token t;
        do {
            t = nextToken();
            tokens.add(t);
        } while (t.type != TokenType.EOF);
        return tokens;
    }

    private Token nextToken() {
        skipWhitespaceAndComments();
        if (eof()) return new Token(TokenType.EOF, null, line, column);
        char c = peek();

        // Strings
        if (c == '\'' || c == '"') {
            return readString();
        }

        // Numbers (simple: digits with optional dot)
        if (Character.isDigit(c)) {
            return readNumber();
        }

        // Identifiers / Keywords
        if (isIdentStart(c)) {
            return readIdentOrKeyword();
        }

        // Punctuation
        switch (c) {
            case '{': advance(); return new Token(TokenType.LBRACE, "{", line, column - 1);
            case '}': advance(); return new Token(TokenType.RBRACE, "}", line, column - 1);
            case '(': advance(); return new Token(TokenType.LPAREN, "(", line, column - 1);
            case ')': advance(); return new Token(TokenType.RPAREN, ")", line, column - 1);
            case ':': advance(); return new Token(TokenType.COLON, ":", line, column - 1);
            case ',': advance(); return new Token(TokenType.COMMA, ",", line, column - 1);
            case '.': advance(); return new Token(TokenType.DOT, ".", line, column - 1);
            case '=': advance(); return new Token(TokenType.EQUALS, "=", line, column - 1);
            case '?': advance(); return new Token(TokenType.QUESTION, "?", line, column - 1);
            case '@': advance(); return new Token(TokenType.AT, "@", line, column - 1);
            default:
                throw error("Unexpected character '" + c + "'");
        }
    }

    private void skipWhitespaceAndComments() {
        while (!eof()) {
            char c = peek();
            // Whitespace
            if (Character.isWhitespace(c)) {
                advance();
                continue;
            }
            // Line comment //
            if (c == '/' && peekNext('/') ) {
                advance(); // '/'
                advance(); // '/'
                while (!eof() && peek() != '\n') advance();
                continue;
            }
            // Block comment /* ... */
            if (c == '/' && peekNext('*')) {
                advance(); // '/'
                advance(); // '*'
                while (!eof()) {
                    if (peek() == '*' && peekNext('/')) {
                        advance(); // '*'
                        advance(); // '/'
                        break;
                    }
                    advance();
                }
                continue;
            }
            break;
        }
    }

    private Token readString() {
        char quote = peek();
        int startLine = line;
        int startCol = column;
        advance(); // opening quote
        StringBuilder sb = new StringBuilder();
        while (!eof()) {
            char c = peek();
            if (c == quote) {
                advance();
                return new Token(TokenType.STRING, sb.toString(), startLine, startCol);
            }
            if (c == '\\') {
                advance();
                if (eof()) break;
                char e = peek();
                switch (e) {
                    case 'n': sb.append('\n'); break;
                    case 'r': sb.append('\r'); break;
                    case 't': sb.append('\t'); break;
                    case '\'': sb.append('\''); break;
                    case '"': sb.append('"'); break;
                    case '\\': sb.append('\\'); break;
                    default: sb.append(e); break;
                }
                advance();
                continue;
            }
            sb.append(c);
            advance();
        }
        throw error("Unterminated string literal");
    }

    private Token readNumber() {
        int startLine = line;
        int startCol = column;
        StringBuilder sb = new StringBuilder();
        boolean seenDot = false;
        while (!eof()) {
            char c = peek();
            if (Character.isDigit(c)) {
                sb.append(c);
                advance();
            } else if (c == '.' && !seenDot) {
                seenDot = true;
                sb.append(c);
                advance();
            } else {
                break;
            }
        }
        return new Token(TokenType.NUMBER, sb.toString(), startLine, startCol);
    }

    private Token readIdentOrKeyword() {
        int startLine = line;
        int startCol = column;
        StringBuilder sb = new StringBuilder();
        while (!eof() && isIdentPart(peek())) {
            sb.append(peek());
            advance();
        }
        String text = sb.toString();
        String lower = text.toLowerCase();
        return switch (lower) {
            case "model" -> new Token(TokenType.MODEL, text, startLine, startCol);
            case "namespace" -> new Token(TokenType.NAMESPACE, text, startLine, startCol);
            case "enum" -> new Token(TokenType.ENUM, text, startLine, startCol);
            case "entity" -> new Token(TokenType.ENTITY, text, startLine, startCol);
            case "relation" -> new Token(TokenType.RELATION, text, startLine, startCol);
            case "hasmany" -> new Token(TokenType.HASMANY, text, startLine, startCol);
            case "hasone" -> new Token(TokenType.HASONE, text, startLine, startCol);
            case "belongsto" -> new Token(TokenType.BELONGSTO, text, startLine, startCol);
            case "manytomany" -> new Token(TokenType.MANYTOMANY, text, startLine, startCol);
            case "mappedby" -> new Token(TokenType.MAPPEDBY, text, startLine, startCol);
            case "as" -> new Token(TokenType.AS, text, startLine, startCol);
            case "true" -> new Token(TokenType.TRUE, text, startLine, startCol);
            case "false" -> new Token(TokenType.FALSE, text, startLine, startCol);
            case "null" -> new Token(TokenType.NULL, text, startLine, startCol);
            default -> new Token(TokenType.IDENT, text, startLine, startCol);
        };
    }

    private boolean isIdentStart(char c) {
        return Character.isLetter(c) || c == '_' || c == '$';
    }

    private boolean isIdentPart(char c) {
        return Character.isLetterOrDigit(c) || c == '_' || c == '$';
    }

    private boolean peekNext(char expected) {
        if (index + 1 >= length) return false;
        return input.charAt(index + 1) == expected;
    }

    private char peek() {
        return input.charAt(index);
    }

    private void advance() {
        char c = input.charAt(index++);
        if (c == '\n') {
            line += 1;
            column = 1;
        } else {
            column += 1;
        }
    }

    private boolean eof() { return index >= length; }

    private RuntimeException error(String message) {
        return new RuntimeException(message + " at " + line + ":" + column);
    }
}