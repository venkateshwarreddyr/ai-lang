export type StateField = { name: string; type: string; optional?: boolean };

export type State = { name: string; fields: StateField[] };

export type Action = {
  name: string;
  inputs: Record<string, string>;
  requires: string[]; // preconditions
  effects: string[];  // state updates
  emits: string[];    // events
};

export type Workflow = {
  name: string;
  transitions: { from: string; to: string; action: string }[];
};