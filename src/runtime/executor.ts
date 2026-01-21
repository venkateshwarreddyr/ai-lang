import { Action } from "../ir/ir";

function evalCondition(cond: string, state: any): boolean {
  const parts = cond.split('==').map(s => s.trim());
  if (parts.length === 2) {
    const [left, right] = parts;
    const value = getValue(left, state);
    return value === right;
  }
  return false;
}

function getValue(path: string, state: any): any {
  const [obj, prop] = path.split('.');
  return state[obj]?.[prop];
}

function applyEffect(effect: string, state: any): void {
  const parts = effect.split('=').map(s => s.trim());
  if (parts.length === 2) {
    const [left, right] = parts;
    const [obj, prop] = left.split('.');
    if (state[obj]) {
      state[obj][prop] = right;
    }
  }
}

export function executeAction(actionName: string, input: any, state: any, actions: Action[]) {
  const action = actions.find(a => a.name === actionName);
  if (!action) throw new Error("Action not found");

  // validate requires
  const valid = action.requires.every(cond => evalCondition(cond, state));
  if (!valid) throw new Error("Constraints not satisfied");

  // execute effects
  action.effects.forEach(effect => applyEffect(effect, state));

  // emit events
  action.emits.forEach(event => console.log(`Event emitted: ${event}`));
}