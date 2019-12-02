const { readFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, 'day2.txt'), 'utf8')
  .split(',').map(Number)

function processOpcodes (memory) {
  let idx = 0
  let current = memory[idx]
  while (current !== 99) {
    const [op, a, b, c] = memory.slice(idx, idx + 4)
    switch (op) {
      case 1: {
        memory[c] = memory[a] + memory[b]
        break
      }
      case 2: {
        memory[c] = memory[a] * memory[b]
        break
      }
      case 99: {
        return memory
      }
    }
    idx += 4
    current = memory[idx]
  }
  return memory
}

function restoreProgramAlarm (memory) {
  const copy = memory.slice()
  copy[1] = 12
  copy[2] = 2

  return processOpcodes(copy)
}

function findTargetOutput (memory, target) {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      const copy = memory.slice()
      copy[1] = i
      copy[2] = j
      const res = processOpcodes(copy)
      if (res[0] === target) return [i, j]
    }
  }
  throw new Error('target not found')
}

console.log('\tsolution 1:', restoreProgramAlarm(input)[0])
console.log('\tsolution 2:', findTargetOutput(input, 19690720))
