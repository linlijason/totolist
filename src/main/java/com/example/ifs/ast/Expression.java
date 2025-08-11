package com.example.ifs.ast;

public sealed interface Expression permits LiteralString, LiteralNumber, LiteralBoolean, NullLiteral, IdentifierRef, FunctionCall {
}