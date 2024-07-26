import { inferSchema, initParser } from 'udsv';


export async function parseCsvFile(csvFilePath: string): Promise<any[]> {
  const csvFile = Bun.file(csvFilePath);
  const csvString = await csvFile.text();
  const schema = inferSchema(csvString);
  const parser = initParser(schema);
  return parser.typedObjs(csvString)
}
