# The Engine

# Parser

This is a line by line parser that categorizes each line as either

- a math expression
- a function call (e.g. `sin(pi/2)`)
- a function definition start (e.g. `function name(...args[]) {`)
- a function definition end (e.g. `}`)
- a directive (e.g. `:sum`, `:avg`, `:clear`, `:min`, `:max`)
- a variable assignment (e.g. `x = 5`), by evaluating the expression on the right-hand side or calling a function
- a comment
- a blank line (can't be evaluated)

NOTE: Function definitions are parsed as regular JavaScript function definitions, so they must be valid JavaScript function definitions.

- I have come to realize that [mathjs](https://github.com/josdejong/mathjs) has a parser, I'll use that instead of building
  my own from scratch.
- The reasoning behind this I want this to be immediately usable, so I don't have to build a parser myself.
- I'll have a preceding tokenizer that catches `directives` and `javascript functions` since they need to be parsed differently than math expressions.
- Mathjs also has capabilities to evaluate math functions, but not a full javascript function it's an addition to the party.

# Javascript Functions

- No typescript, only javascript
- No module imports, from available standard libraries
