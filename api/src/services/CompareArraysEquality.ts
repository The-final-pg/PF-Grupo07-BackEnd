export function compareArrays(array1: string[], array2: string[]): boolean {
  if (array1.length != array2.length) return false;
  if (JSON.stringify(array1.sort()) !== JSON.stringify(array2.sort()))
    return false;
  return true;
}
