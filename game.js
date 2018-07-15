// Need to have an undo/redo function

boardCells = [] //contains instance of all cells

function createCells () {
  // Create instances of each cell on the board
  // From cell00(top right) to cell88(bottom left)
  // Then append them to the global boardCells array
  for (let rowNum = 0; rowNum <= 8; rowNum++){
    for (let collumnNum = 0; collumnNum <= 8; collumnNum++){
      currentCellName = 'cell' + rowNum + collumnNum
      boardCells[currentCellName] = new Cell(rowNum, collumnNum)
    }
  }
}

class Board {
  notify(cellObj, numberToNotify) {
    //tell adjacent cells to remove a number from available numbers list
    this.xCoord = cellObj.returnCoords()[0]
    this.yCoord = cellObj.returnCoords()[1]

    //Tell all cells in the row
    for (let x = 0; x < 9; x++){
      boardCells['cell' + x + this.yCoord].removeNumber(numberToNotify)
    }

    //Tell all cells in the collumn
    for (let y = 0; y < 9; y++){
      boardCells['cell' + this.xCoord + y].removeNumber(numberToNotify)
    }

    //Tell all cells in the box
    this.topLeftCoords = cellObj.returnBoxTopLeftCoords();
    this.topLeftX = this.topLeftCoords[0]
    this.topLeftY = this.topLeftCoords[1]
    for (let y = 0; y < 3; y++){
      for (let x = 0; x < 3; x++){
        boardCells['cell' + this.topLeftX + this.topLeftY].removeNumber(numberToNotify)
        this.topLeftX++
      }
      this.topLeftY++
      this.topLeftX = this.topLeftX - 3
    }
  }

  clearBoard(){
    // reset the board to blank and clear cells
    for (let x = 0; x <= 8; x++){
      for (let y = 0; y <= 8; x++){
        boardCells['cell' + x + y].reset()
      }
    }
  }
}

class Cell extends Board{
  constructor (xCoord, yCoord) {
    super()
    this.xCoord = xCoord
    this.yCoord = yCoord
    this.cellNumber = '' // The number to set in the cell
    this.availableNumList = [1,2,3,4,5,6,7,8,9] // Possible legal numbers for cell
  }

  returnCoords() {
    // return x y array of cell [x,y]
    return [this.xCoord, this.yCoord]
  }

  returnBoxTopLeftCoords() {
    // return x y array of top left cell in the box [x,y]
    let xCoordCopy = this.xCoord
    let yCoordCopy = this.yCoord

    while (xCoordCopy%3 != 0){
      xCoordCopy--
    }
    while (yCoordCopy%3 != 0){
      yCoordCopy--
    }

    return [xCoordCopy, yCoordCopy]
  }

  returnRandomPossibleNumber(){
    // return a single number that is possible for the cell
    let randomNum = Math.floor(Math.random() * this.availableNumList.length)
    return this.availableNumList[randomNum]
  }

  removeNumber(numberToRemove) {
    //remove a number from availableNumList for this cell
    let location = this.availableNumList.indexOf(numberToRemove);
    if (location > -1) {
      this.availableNumList.splice(location, 1);
    }
  }

  chooseNumber(){
    // Pick a number from availableNumList and set it as the cells number
    if (this.availableNumList.length > 0){
      let numToSet = this.returnRandomPossibleNumber()
      this.cellNumber = numToSet
      Board.prototype.notify(boardCells['cell' + this.xCoord + this.yCoord],numToSet)
      console.log("cell" + this.xCoord + this.yCoord + ": " + numToSet)
    }
    else {
      // No numbers are availabe for this cell will have to start over!!!!
      console.log("No legal numbers left: " + "cell" + this.xCoord + this.yCoord)
    }
  }

  reset(){
    this.cellNumber = ''
  }
}



// Run Code
createCells()

let sudoku = new Board()

for (let x = 0; x <= 8; x++){
  for (let y = 0; y <= 8; y++){
    boardCells['cell'+ x + y].chooseNumber()
  }
}
