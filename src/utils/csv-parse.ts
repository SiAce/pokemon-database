import Papa from "papaparse";

export async function parseCsvFile(csvFilePath: string, fastMode = true): Promise<any[]> {
  const csvFile = Bun.file(csvFilePath);
  const csvString = await csvFile.text();
  return Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    fastMode,
  }).data;
}
