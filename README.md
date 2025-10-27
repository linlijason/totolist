# IFS Model Language Parser (Java/Groovy)

This is a lightweight, dependency-free parser for an example IFS Model Language DSL, implemented with a hand-written lexer and parser in Java, plus a Groovy wrapper.

Example DSL:

```text
model "ShopModel"
namespace com.example.shop

enum Status { NEW, ACTIVE, SUSPENDED }

entity User {
  id: UUID @pk
  name: String
  age: Int?
  status: Status = NEW
  createdAt: Instant @default(now())
}

relation User hasMany Order mappedBy user
```

Build and run without a build tool (javac):

```bash
# Compile Java sources
find src/main/java -name "*.java" > sources.txt
mkdir -p out
javac -d out @sources.txt

# Run the CLI on the sample
java -cp out com.example.ifs.cli.Main src/test/resources/sample.ifsml
```

Groovy usage (if Groovy is available on your classpath):

```groovy
import com.example.ifs.IfsParser

def model = IfsParser.parseString(new File('src/test/resources/sample.ifsml').text)
println model
```

Notes:
- The grammar supports: model, namespace, enum, entity with attributes (defaults and annotations), and relation (hasOne, hasMany, belongsTo, manyToMany).
- Types support generics (e.g., `Array<String>`) and params (e.g., `Decimal(10,2)`) with nullable (`?`).
- Expressions for defaults: string, number, boolean, null, identifier and function calls (simple).
- Comments: `// ...` and `/* ... */`.