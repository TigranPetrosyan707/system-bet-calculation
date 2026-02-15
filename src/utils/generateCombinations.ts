export function generateCombinations(n: number, k: number): number[][] {
  if (k === 0) {
    return [[]]
  }
  
  if (k > n) {
    return []
  }
  
  if (k === n) {
    return [Array.from({ length: n }, (_, i) => i)]
  }
  
  const combinations: number[][] = []
  
  function backtrack(start: number, currentCombination: number[]) {
    if (currentCombination.length === k) {
      combinations.push([...currentCombination])
      return
    }
    
    for (let i = start; i < n; i++) {
      currentCombination.push(i)
      backtrack(i + 1, currentCombination)
      currentCombination.pop()
    }
  }
  
  backtrack(0, [])
  
  return combinations
}

