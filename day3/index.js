const { readFileSync } = require('fs')
const { join } = require('path')

const [a, b] = readFileSync(join(__dirname, 'day3.txt'), 'utf8')
  .split('\n').map(line => line.split(','))

function generateCoordinates (directions) {
  let stepsTaken = 1
  return directions.reduce((path, directive) => {
    let [direction, ...steps] = directive.split('')
    let { loc: [x, y] } = path[path.length - 1]
    steps = parseInt(steps.join(''), 10)
    while (steps) {
      switch (direction) {
        case 'L': {
          x -= 1
          break
        }
        case 'R': {
          x += 1
          break
        }
        case 'U': {
          y += 1
          break
        }
        case 'D': {
          y -= 1
          break
        }
      }
      path.push({ loc: [x, y], stepsTaken })
      stepsTaken += 1
      steps -= 1
    }
    return path
  }, [{ loc: [0, 0], stepsTaken: 0 }])
}

function findIntersections (pathA, pathB) {
  const A = new Map()
  const B = new Map()

  for (const el of pathA) {
    if (!A.has(el.loc)) {
      A.set(el.loc.join(':'), el.stepsTaken)
    }
  }
  for (const el of pathB) {
    if (!B.has(el.loc)) {
      B.set(el.loc.join(':'), el.stepsTaken)
    }
  }

  const intersections = new Map()
  for (const [loc, stepsTaken] of A.entries()) {
    if (B.has(loc)) intersections.set(loc, stepsTaken + B.get(loc))
  }

  const output = new Map()
  for (const [loc, stepsTaken] of intersections.entries()) {
    output.set(loc.split(':').map(Number), stepsTaken)
  }
  return output
}

function manhattanDistance ([ax, ay], [bx, by]) {
  return Math.abs(ax - bx) + Math.abs(ay - by)
}

function findIntersectionNearestToOrigin (directionsA, directionsB) {
  const pathA = generateCoordinates(directionsA)
  const pathB = generateCoordinates(directionsB)
  const intersections = findIntersections(pathA.slice(1), pathB.slice(1))

  const origin = [0, 0]
  let minDistance = Infinity
  let nearestByDistance = null
  let minSteps = Infinity
  let nearestBySteps = null
  for (const [loc, stepsTaken] of intersections.entries()) {
    const distance = manhattanDistance(origin, loc)
    if (distance < minDistance) {
      minDistance = distance
      nearestByDistance = loc
    }
    if (stepsTaken < minSteps) {
      minSteps = stepsTaken
      nearestBySteps = loc
    }
  }
  return { nearestByDistance, nearestBySteps, minDistance, minSteps }
}

const { minDistance, minSteps } = findIntersectionNearestToOrigin(a, b)
console.log('\tsolution 1:', minDistance)
console.log('\tsolution 2:', minSteps)
