export function compareArrays (a: number[], b: number[]) {
  return a.length === b.length && a.every((element, index) => element === b[index]);
}

export function last(a: any[]){
  return a[a.length - 1];
}
