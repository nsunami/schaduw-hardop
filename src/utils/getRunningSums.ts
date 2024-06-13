export function getRunningSums(array: RegExpMatchArray) {
  let sum = 0
  return array.map((e) => (sum += e.length))
}
