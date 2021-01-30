import fs from 'fs';

// TODO: Remove when we add another method here.
// eslint-disable-next-line import/prefer-default-export
export function parseDataFile<T>(filePath: string, defaultVal: T): T {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    const buff = fs.readFileSync(filePath);
    return JSON.parse(buff.toString());
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaultVal;
  }
}
