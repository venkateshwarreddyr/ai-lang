Program
  = items:(State / Action / Workflow)* { return items; }

State
  = "state" _ name:Identifier _ "{" _ fields:Field* _ "}" _ {
      return { type: "state", name, fields };
    }

Field
  = name:Identifier _ ":" _ type:Type _ {
      return { name, type };
    }

Type
  = [a-zA-Z_][a-zA-Z0-9_ |]* { return text(); }

Action
  = "action" _ name:Identifier _ "(" _ params:Params _ ")" _ "{" _ body:(Requires / Effect / Emit)* _ "}" _ {
      const requires = body.filter(b => b.type === "requires").map(b => b.condition);
      const effects = body.filter(b => b.type === "effect").map(b => b.effect);
      const emits = body.filter(b => b.type === "emit").map(b => b.event);
      return { type: "action", name, params, requires, effects, emits };
    }

Params
  = params:Param* { return params; }

Param
  = name:Identifier _ ":" _ type:Identifier _ ","? _ {
      return { name, type };
    }

Requires
  = "requires" _ condition:Expression _ {
      return { type: "requires", condition };
    }

Effect
  = "effect" _ effect:Expression _ {
      return { type: "effect", effect };
    }

Emit
  = "emit" _ name:Identifier _ "(" _ args:Args _ ")" _ {
      return { type: "emit", event: { name, args } };
    }

Args
  = args:Identifier* { return args; }

Workflow
  = "workflow" _ name:Identifier _ "{" _ transitions:Transition* _ "}" _ {
      return { type: "workflow", name, transitions };
    }

Transition
  = from:Identifier _ "->" _ action:Identifier _ {
      return { from, action };
    }

Expression
  = [^\n\r]* { return text().trim(); }  // Simplified, just capture the line

Identifier
  = [a-zA-Z_][a-zA-Z0-9_]* { return text(); }

_
  = [ \t\n\r]*