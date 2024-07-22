import Papa from "papaparse";
import { readFile } from 'node:fs/promises';

export async function parseCsvFile(csvFilePath: string, fastMode = true) {
  const csvString = await readFile(csvFilePath, { encoding: 'utf8' })
  return Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    fastMode,
  }).data;
}

