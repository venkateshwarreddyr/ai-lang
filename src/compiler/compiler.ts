import { State, Action, Workflow } from "../ir/ir";

export function astToIR(ast: any[]): { states: State[], actions: Action[], workflows: Workflow[] } {
  const states: State[] = [];
  const actions: Action[] = [];
  const workflows: Workflow[] = [];

  for (const item of ast) {
    if (item.type === "state") {
      states.push({
        name: item.name,
        fields: item.fields.map((f: any) => ({ name: f.name, type: f.type }))
      });
    } else if (item.type === "action") {
      actions.push({
        name: item.name,
        inputs: item.params.reduce((acc: any, p: any) => ({ ...acc, [p.name]: p.type }), {}),
        requires: item.requires,
        effects: item.effects,
        emits: item.emits.map((e: any) => `${e.name}(${e.args.join(', ')})`)
      });
    } else if (item.type === "workflow") {
      workflows.push({
        name: item.name,
        transitions: item.transitions.map((t: any) => ({ from: t.from, to: t.to, action: t.action }))
      });
    }
  }

  return { states, actions, workflows };
}