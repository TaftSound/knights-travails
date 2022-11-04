const createGameBoard = () => {
  const gameBoard = []
  let knightPosition = null
  for (let i = 0; i < 8; i++) {
    gameBoard.push([])
    for (let j = 0; j < 8; j++) {
      gameBoard[i].push([' '])
    }
  }
  const clearSpace = (row, column) => {
    gameBoard[row][column] = ' '
  }

  const gameBoardObject = {
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
    }
  }
  return gameBoardObject
}

const gameBoard = createGameBoard()
gameBoard.setKnightPosition(3, 7)
gameBoard.print()
gameBoard.setKnightPosition(5, 3)
gameBoard.print()



// row + 2, col - 1
// row + 2, col + 1
// row - 2, col - 1
// row - 2, col + 1
// row + 1, col - 2
// row + 1, col + 2
// row - 1, col - 2
// row - 1, col + 2