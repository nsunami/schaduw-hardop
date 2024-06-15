export function getIntervals(array: number[]) {
  const intervals = []
  for (let i = 0; i < array.length - 1; i++) {
    intervals.push([array[i], array[i + 1]])
  }
  return intervals
}
