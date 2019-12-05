const { readFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, 'day5.txt'), 'utf8')
  .split(',').map(Number)

const PARAM_LEN_MAP = {
  1: 3,
  2: 3,
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  99: 0
}

function parseOpcode (instruction) {
  const opcode = instruction % 100
  if (typeof PARAM_LEN_MAP[opcode] === 'undefined') {
    throw new Error('invalid opcode found: ' + opcode)
  }
  const paramTypes = []
  let inst = Math.floor(instruction / 100)
  while (inst) {
    const type = inst % 10
    if (type) {
      paramTypes.push({ immediate: true })
    } else {
      paramTypes.push({ position: true })
    }
    inst = Math.floor(inst / 10)
  }
  while (paramTypes.length < PARAM_LEN_MAP[opcode]) {
    paramTypes.push({ position: true })
  }
  return { opcode, paramTypes }
}

function getFunc (idx, memory) {
  const { opcode, paramTypes } = parseOpcode(memory[idx])
  const params = paramTypes.map(({ immediate }, i) => ({
    get: () => immediate ? memory[idx + i + 1] : memory[memory[idx + i + 1]],
    set: (val) => { memory[memory[idx + i + 1]] = val }
  }))
  return { opcode, params }
}

function processOpcodes (inputParam, memory) {
  const output = []
  let idx = 0
  while (true) {
    const { opcode, params } = getFunc(idx, memory)
    switch (opcode) {
      case 1: {
        params[2].set(params[0].get() + params[1].get())
        break
      }
      case 2: {
        params[2].set(params[0].get() * params[1].get())
        break
      }
      case 3: {
        params[0].set(inputParam)
        break
      }
      case 4: {
        output.push(params[0].get())
        break
      }
      case 5: {
        if (params[0].get()) {
          idx = params[1].get()
          continue
        }
        break
      }
      case 6: {
        if (!params[0].get()) {
          idx = params[1].get()
          continue
        }
        break
      }
      case 7: {
        params[2].set(params[0].get() < params[1].get() ? 1 : 0)
        break
      }
      case 8: {
        params[2].set(params[0].get() === params[1].get() ? 1 : 0)
        break
      }
      case 99: {
        return output
      }
      default: {
        throw new Error('invalid opcode reached: ' + opcode)
      }
    }
    idx += (1 + params.length)
  }
}

console.log('\tsolution 1:', processOpcodes(1, input.slice()))
console.log('\tsolution 2:', processOpcodes(5, input.slice()))
