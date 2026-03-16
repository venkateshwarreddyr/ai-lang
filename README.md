# AILang — DSL Compiler for AI Workflows

A TypeScript compiler for **AILang** (`.ail`), a domain-specific language for defining stateful workflows and state machines that AI agents can understand and execute.

Write declarative workflow specs in AILang → compiler produces structured AI-compatible context that LLMs and MCP-based agents can reason over.

## Architecture

```
.ail source
    ↓
Parser (PEG.js grammar)
    ↓
AST
    ↓
Compiler → IR (Intermediate Representation)
    ↓
Context Generator → AI-compatible JSON
    ↓
Runtime (state manager + event log + executor)
    ↓
MCP Adapters (Model Context Protocol stubs)
```

## AILang Syntax

```ailang
entity Todo {
  id: string
  title: string
  status: PENDING | IN_PROGRESS | DONE
}

action StartTodo {
  requires Todo.status == PENDING
  effects Todo.status = IN_PROGRESS
}

action CompleteTodo {
  requires Todo.status == IN_PROGRESS
  effects Todo.status = DONE
}

invariant Todo.status == DONE implies true
```

See [examples/](./examples/) for more — including a full multi-module [employee onboarding workflow](./examples/employee-onboarding/).

## Quick Start

```bash
npm install
npm run dev                       # run with default examples/todo.ail
npm run dev -- examples/multi-domain.ail
```

## Build

```bash
npm run build   # tsc → dist/
npm start       # run compiled output
```

## Project Structure

```
src/
├── index.ts               # CLI entry point
├── parser/
│   ├── ailang.pegjs       # PEG.js grammar for AILang
│   └── parser.ts          # Parser wrapper
├── ir/
│   └── ir.ts              # Intermediate representation types
├── compiler/
│   ├── compiler.ts        # AST → IR
│   └── contextGenerator.ts # IR → AI-compatible JSON context
├── runtime/
│   ├── executor.ts        # Action executor
│   ├── stateManager.ts    # State transitions
│   └── eventLog.ts        # Event sourcing log
├── mcp/
│   └── adapters.ts        # Model Context Protocol stubs
└── visualizer.ts          # Workflow visualizer
examples/
├── todo.ail               # Simple todo state machine
├── multi-domain.ail       # Multi-entity workflow
└── employee-onboarding/   # Multi-module real-world workflow
    ├── employee/
    ├── accounts/
    ├── documents/
    ├── equipment/
    ├── meetings/
    └── training/
```

## Tech Stack

- **TypeScript** 4.9
- **PEG.js** — parser generator (grammar-based parsing)
- **ts-node** — development runner
