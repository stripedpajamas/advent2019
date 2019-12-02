const { readFileSync } = require('fs')
const { join } = require('path')

const input = readFileSync(join(__dirname, 'day1.txt'), 'utf8')
  .split('\n').map(Number)

function getFuelReq (mod) {
  return Math.floor(mod / 3) - 2
}

function sumFuelReqs (modules) {
  return modules.reduce((total, mod) => {
    return total + getFuelReq(mod)
  }, 0)
}

function getCompleteFuelReq (mod) {
  const req = getFuelReq(mod)
  return req <= 0 ? 0 : req + getCompleteFuelReq(req)
}

function sumCompleteFuelReqs (modules) {
  return modules.reduce((total, mod) => {
    return total + getCompleteFuelReq(mod)
  }, 0)
}

console.log('\tsolution 1:', sumFuelReqs(input))
console.log('\tsolution 2:', sumCompleteFuelReqs(input))
