import peg from "pegjs";
import fs from "fs";
import path from "path";

export function parseAILang(filePath: string) {
  const grammarPath = path.join(__dirname, "../../src/parser/ailang.pegjs");
  const grammar = fs.readFileSync(grammarPath, "utf8");
  const parser = peg.generate(grammar);
  const text = fs.readFileSync(filePath, "utf8");
  return parser.parse(text);
}