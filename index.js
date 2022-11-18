

const createGameBoard = () => {
  const gameBoard = []
  let knightPosition = null
  for (let i = 0; i < 8; i++) {
    gameBoard.push([])
    for (let j = 0; j < 8; j++) {
      gameBoard[i].push([' '])
    }
  }
  const getSpaceKey = (boardSpace) => {
    if (boardSpace[0] > 7 || boardSpace[0] < 0) { return null }
    if (boardSpace[1] > 7 || boardSpace[1] < 0) { return null }
    const number = +boardSpace[0] * 8 + +boardSpace[1] + 1
    return `v${number}`
  }
  const clearSpace = (row, column) => {
    gameBoard[row][column] = ' '
  }
  const getNextMoves = (currentPosition = knightPosition) => {
    const nextMovesArray = [ [2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2], ]
    const nextPositionArray = []
    for (const move in nextMovesArray) {
      let row = +currentPosition[0] + +nextMovesArray[move][0]
      let column = +currentPosition[1] + +nextMovesArray[move][1]
      if (row < 0 || row > 7) { continue }
      if (column < 0 || column > 7) { continue }
      nextPositionArray.push([row, column])
    }
    return nextPositionArray
  }
  const createAdjacencyList = () => {
    const adjacencyList = {}
    for (let row in gameBoard) {
      for (let column in gameBoard[row]) {
        const spaceKey = getSpaceKey([row, column])
        const coordinates = [row, column]
        const adjacentVertices = []
        const possibleMovesArray = getNextMoves([row, column])
        for (const move in possibleMovesArray) {
          const possibleMove = getSpaceKey(possibleMovesArray[move])
          adjacentVertices.push(possibleMove)
        }
        adjacencyList[spaceKey] = { coordinates, adjacentVertices }
      }
    }
    return adjacencyList
  }
  
  const adjacencyList = createAdjacencyList()

  const gameBoardObject =  {
    print: () => {
      let boardString = ''
      for (const row in gameBoard) {
        boardString += '- '
        for (const column in gameBoard[row]) {
          boardString += `[${gameBoard[row][column]}]`
        }
        boardString += ' -\n'
      }
      console.log(boardString)
    },
    setKnightPosition: (row, column) => {
      if (knightPosition) {
        clearSpace(...knightPosition)
      }
      knightPosition = [row, column]
      gameBoard[row][column] = '•'
    }, 
    moveKnight: (start, end) => {
      const startKey = getSpaceKey(start)
      const endKey = getSpaceKey(end)
      if (!startKey || !endKey) {
        return console.log('Please enter valid board spaces')
      }
      const queue = [ [startKey, [startKey]] ]
      traverseAdjacency ()
      function traverseAdjacency () {
        while (queue[0]) {
          let adjacencies = adjacencyList[queue[0][0]].adjacentVertices
          for (const adjacency in adjacencies) {
            const path = queue[0][1].concat([adjacencies[adjacency]])
            if (adjacencies[adjacency] === endKey) {
              printPath(path)
              return path
            }
            queue.push([adjacencies[adjacency], path])
          }
          queue.shift() 
        }
        function printPath (path) {
          for (const move in path) {
            let space = adjacencyList[path[move]].coordinates
            console.log(space)
          }
        }
      }
    }
  }
  return gameBoardObject
}

const gameBoard = createGameBoard()
gameBoard.moveKnight([0, 3], [1, 7])



// search coordinates e.g. [0, 5] [7, 3]
// get space keys,    e.g.  ^ v6   ^ v60
// search v6 adjacent vertices
// add each vertice key to a queue as you go
// if one of them were v60, you would return just v6 then v60
// it is not, so continue
// for each vertice in the queue, search each of their adjacent
// vertices for v60, adding each to the queue as you go
// you need an array to keep track of the path taken at any given moment
// always gonna start with v6, can it be done with push and pop?
// when you push a key on queue, push it with the path taken thus far
// [v6, [v6]] [v12, [v6, v12]] [v18, [v6, v12, v18]]

// row + 2, col - 1
// row + 2, col + 1
// row - 2, col - 1
// row - 2, col + 1
// row + 1, col - 2
// row + 1, col + 2
// row - 1, col - 2
// row - 1, col + 2