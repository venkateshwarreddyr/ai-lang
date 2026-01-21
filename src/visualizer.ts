import { State, Action, Workflow } from "./ir/ir";

export function generateVisualization(ir: { states: State[], actions: Action[], workflows: Workflow[] }): string {
  const { states, actions, workflows } = ir;

  // For simplicity, assume one workflow
  const workflow = workflows[0];
  if (!workflow) return "<html><body>No workflow found</body></html>";

  const nodes = states.map(s => ({ id: s.name, label: s.name, title: s.fields.map(f => `${f.name}: ${f.type}`).join('<br>') }));
  const edges = workflow.transitions.map(t => {
    const action = actions.find(a => a.name === t.action);
    return {
      from: t.from,
      to: t.to,
      label: t.action,
      title: action ? `Requires: ${action.requires.join(', ')}<br>Effects: ${action.effects.join(', ')}` : ''
    };
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Workflow Visualization</title>
  <script type="text/javascript" src="https://unpkg.com/vis-network@9.1.2/standalone/umd/vis-network.min.js"></script>
  <style>
    #network {
      width: 100%;
      height: 600px;
      border: 1px solid lightgray;
    }
  </style>
</head>
<body>
  <h1>${workflow.name}</h1>
  <div id="network"></div>
  <script>
    const nodes = new vis.DataSet(${JSON.stringify(nodes)});
    const edges = new vis.DataSet(${JSON.stringify(edges)});
    const container = document.getElementById('network');
    const data = { nodes, edges };
    const options = {};
    const network = new vis.Network(container, data, options);
  </script>
</body>
</html>
  `;

  return html;
}