import { inferSchema, initParser } from "udsv";
import { readFile } from "node:fs/promises";

export async function parseCsvFile(csvFilePath: string, csvBasePath: string = ""): Promise<any[]> {
  const csvString = await readFile(csvBasePath + csvFilePath, { encoding: "utf8" });
  const schema = inferSchema(csvString);
  const parser = initParser(schema);
  return parser.typedObjs(csvString);
}
