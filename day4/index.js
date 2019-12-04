function criteria (n, strict) {
  let lastDigit = n % 10
  let double = false
  const doubles = {}
  while (n) {
    n = Math.floor(n / 10)
    if ((n % 10) > lastDigit) return false
    if ((n % 10) === lastDigit) {
      if (strict) {
        doubles[n % 10] = (doubles[n % 10] || 0) + 1
      } else {
        double = true
      }
    }
    lastDigit = n % 10
  }
  return strict ? Object.values(doubles).includes(1) : double
}

function countPossiblePasswords (min, max, strict) {
  let count = 0
  for (let n = min; n < max; n++) {
    if (criteria(n, strict)) count++
  }
  return count
}

console.log('\tsolution 1:', countPossiblePasswords(178416, 676461))
console.log('\tsolution 2:', countPossiblePasswords(178416, 676461, true))
