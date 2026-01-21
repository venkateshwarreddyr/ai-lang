import { parseAILang } from "./parser/parser";
import { astToIR } from "./compiler/compiler";
import { generateAIContext } from "./compiler/contextGenerator";

const filePath = process.argv[2] || "examples/multi-domain.ail";
const ast = parseAILang(filePath);

const ir = astToIR(ast);

const currentState = {
  Todo: { id: "42", title: "Write blog", status: "PENDING" },
  User: { id: "user_1", role: "MEMBER" },
  Invoice: { id: "99", status: "APPROVED", amount: 500 }
};
console.log(JSON.stringify(generateAIContext(currentState, ir.actions), null, 2));