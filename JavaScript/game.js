boardCells = [] //contains instance of all cells ['cell36','cell82',etc]
buildLog = [] // log of all steps taken to create a sudoku [<cellName>,<num>]

function createCells() {
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
  notifyRemove(cellObj, numberToRemove) {
    //tell adjacent cells to remove a number from available numbers list
    this.xCoord = cellObj.returnCoords()[0]
    this.yCoord = cellObj.returnCoords()[1]

    //Tell all cells in the row
    for (let x = 0; x < 9; x++){
      boardCells['cell' + x + this.yCoord].removeNumber(numberToRemove)
    }

    //Tell all cells in the collumn
    for (let y = 0; y < 9; y++){
      boardCells['cell' + this.xCoord + y].removeNumber(numberToRemove)
    }

    //Tell all cells in the box
    this.topLeftCoords = cellObj.returnBoxTopLeftCoords();
    this.topLeftX = this.topLeftCoords[0]
    this.topLeftY = this.topLeftCoords[1]
    for (let y = 0; y < 3; y++){
      for (let x = 0; x < 3; x++){
        boardCells['cell' + this.topLeftX + this.topLeftY].removeNumber(numberToRemove)
        this.topLeftX++
      }
      this.topLeftY++
      this.topLeftX = this.topLeftX - 3
    }
  }

  notifyAdd(cellObj, numberToAdd) {
    //tell adjacent cells to add a number to available numbers list
    this.xCoord = cellObj.returnCoords()[0]
    this.yCoord = cellObj.returnCoords()[1]

    //Tell all cells in the row
    for (let x = 0; x < 9; x++){
      boardCells['cell' + x + this.yCoord].addNumber(numberToAdd)
    }

    //Tell all cells in the collumn
    for (let y = 0; y < 9; y++){
      boardCells['cell' + this.xCoord + y].addNumber(numberToAdd)
    }

    //Tell all cells in the box
    this.topLeftCoords = cellObj.returnBoxTopLeftCoords();
    this.topLeftX = this.topLeftCoords[0]
    this.topLeftY = this.topLeftCoords[1]
    for (let y = 0; y < 3; y++){
      for (let x = 0; x < 3; x++){
        boardCells['cell' + this.topLeftX + this.topLeftY].addNumber(numberToAdd)
        this.topLeftX++
      }
      this.topLeftY++
      this.topLeftX = this.topLeftX - 3
    }
  }

  clearBoard(){
    // reset the board to blank and clear cells
    for (let x = 0; x <= 8; x++){
      for (let y = 0; y <= 8; y++){
        boardCells['cell' + x + y].reset()
      }
    }
  }

  createSudoku(){
    for (let x = 0; x < 9; x++){
      for (let y = 0; y < 9; y++){
        let workingCell = boardCells['cell'+x+y]
        try{
          workingCell.chooseNumber()
        } catch(error) {
          if (error == 'NoAvailableNums') {
            console.log('cell' + x + y + ': No Available Nums')
            workingCell = this.backtrack(workingCell)
          }
        }
        workingCell.displayNumber()
      }
    }
  }

  backtrack(currentCell){
    // when a cell has no available nums, go back to the previous cell and try
    //  a new number
    let cellCollum = currentCell.returnCoords()[0]
    let cellRow = currentCell.returnCoords()[1]
    let previousCell = ''

    this.notifyAdd(currentCell, currentCell.cellNumber)

    if (cellRow > 0) {
        previousCell = boardCells['cell' + cellCollum + (cellRow - 1)]
    } else {
      previousCell = boardCells['cell' + (cellCollum -1 ) + '9']
    }

    currentCell.undo();
    previousCell.undo()

    let workingCell = previousCell

    try{
      previousCell.chooseNumber()
    } catch(error){
      if (error == 'NoAvailableNums'){
          console.log('cell' + x + y + ': No Available Nums')
        if(workingCell != 'cell00'){
          this.backtrack(workingCell)
        } else{
          console.log("Well, we're fucked")
        }
      }
    }
    return workingCell
  }
}

class Cell extends Board{
  constructor (xCoord, yCoord) {
    super()
    this.xCoord = xCoord
    this.yCoord = yCoord
    this.cellNumber = '' // The number to set in the cell
    this.availableNumList = [1,2,3,4,5,6,7,8,9] // Possible legal numbers for cell
    this.HTMLcell = document.getElementById('' + xCoord + yCoord)
    this.alreadyTried = [] // List of numbers that have been tried for the cell
  }

  returnHTMLcell() {
    return this.HTMLcell
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
    let possibleNums = this.availableNumList.slice();

    console.log(this.alreadyTried.length)

    if (this.alreadyTried.length > 0){
      for (let x = 0; x < this.alreadyTried.length; x++){
        let location = possibleNums.indexOf(this.alreadyTried[x]);
        if (location > -1) {
            possibleNums.splice(location, 1);
          }
        }
      }

    var randomNum = Math.floor(Math.random() * possibleNums.length)
    return possibleNums[randomNum]
  }

  removeNumber(numberToRemove) {
    //remove a number from availableNumList for this cell
    let location = this.availableNumList.indexOf(numberToRemove);
    if (location > -1) {
      this.availableNumList.splice(location, 1);
    }
  }

  addNumber(numberToAdd){
    // add a number to availableNumList for this cell
    let location = this.availableNumList.indexOf(numberToAdd);
    if (location == -1) {
      this.availableNumList.push(numberToAdd);
    }
  }

  chooseNumber(){
    // Pick a number from availableNumList and set it as the cells number
    if (this.availableNumList.length > 0){
      let numToSet = this.returnRandomPossibleNumber()
      this.cellNumber = numToSet
      this.alreadyTried.push(numToSet)
      Board.prototype.notifyRemove(boardCells['cell' + this.xCoord + this.yCoord],numToSet)
    }
    else {
      throw 'NoAvailableNums'
    }
  }

  displayNumber(){
    if (this.cellNumber !=''){
      this.HTMLcell.innerHTML = this.cellNumber
    }
    else {
      console.log("issue at: " + this.returnCoords())
    }
  }

  reset(){
    this.cellNumber = ''
    this.HTMLcell.innerHTML = ''
    this.availableNumList = [1,2,3,4,5,6,7,8,9]
    this.alreadyTried = []
  }

  undo(){
    this.cellNumber = ''
    this.HTMLcell.innerHTML = ''
  }

}

let sudoku = new Board();
let toggle = '' // switch between last clicked buttons

function build() {
  if (toggle != 'build'){
    toggle = 'build'

     createCells()
     sudoku.createSudoku()

    }
  }

function reset() {
  if (toggle != 'clear'){
    toggle = 'clear'

      sudoku.clearBoard()

  }
}
