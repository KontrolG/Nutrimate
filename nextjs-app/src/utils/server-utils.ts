import fs from 'fs';
import path from 'path';

// Note: getDataFromJSON is adapted to work with Next.js API routes.
// The data loading strategy might need to be more sophisticated later.
export const getDataFromJSON = (dataName: string): any[] => {
  // Assuming 'data' folder is at the project root, sibling to 'nextjs-app'
  const dataPath = path.join(process.cwd(), '..', 'data', `${dataName}Data.json`);
  try {
    const dataJSON = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(dataJSON);
  } catch (error) {
    console.error(`Error reading data file ${dataName}Data.json:`, error);
    return []; // Return empty array or throw error as appropriate
  }
};

export const sanitizePattern = (str: string | undefined | null): string => {
  if (!str) return '';
  return str.replace(/[^\w\s\%\,\.]/gi, '');
};

export const getPositiveInteger = (str: string | undefined | null): number | undefined => {
  if (!str) return undefined;
  const num = parseInt(str, 10);
  return isNaN(num) ? undefined : Math.abs(num);
};

// sendDataInJSON and other response-related utils will be handled by Next.js NextResponse
// isValid and pageNotFoundError might not be directly needed or will be handled differently.
