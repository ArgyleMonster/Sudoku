function generateCellClasses(){
  for (var x = 0; x <= 8; x++) {
    for (var y = 0; y <= 8; y++) {
      var className = "cell" + x + y;
      this[className] = new Cell(x,y);
    }
  }
}

class Board {
  constructor(){
  }

  initialSetup(x,y) { //Fill three diagonal boxes
    // topLeftCell = "" + x + y;
    // do {
    //   cellName = "cell" + x + y;
    //   tdCell = document.getElementById(topLeftCell)
    //   this[cellName].generateNum();
    //   this[cellName].populate();
    // } while(cellNum <= 9);

    topLeftCell = "" + x + y;
    cellName = "cell" + x + y;
    tdCell = document.getElementById(topLeftCell)
    this[cellName].generateNum();
    this[cellName].populate();
  }

  notify(cellName, numberToRemove) { //tell all conflicting cells to remove populated number
    this.topLeftCell = cellName.topLeftCell();
    this.x = this.topLeftCell.charAt(0);
    this.y = this.topLeftCell.charAt(1);
    boxNum = 1;
    while(boxNum <= 9){
      cellName.remove(numberToRemove);
      if (boxNum == 3 || boxNum == 6){
        this.x = this.x - 2;
        this.y++;
      } else {
        this.x++;
      }
      console.log(cellName.availableNumList());
    }
  }
}

class Cell extends Board {
  constructor(x,y){
    var cellNum; //final generated number for the cell
    super(cellNum);
    this.availableNumList = [1,2,3,4,5,6,7,8,9];
    this.cellID = "" + x + y;
  }

  removeNumber(numToRemove) {
    var loc = this.availableNumList.indexOf(numToRemove);
    if (loc > -1) {
      this.availableNumList.splice(loc, 1);
    }
  }

  reAddNumber(numToAdd) {
    if (numToAdd > 0 && numToAdd < 10) {
      console.log(this.availableNumList.indexOf(numToAdd));
      this.availableNumList.push(numToAdd);
    }
  }

  populate() { //push final number to the cell
    document.getElementById(this.cellID).innerHTML = this.cellNum;
  }

  generateNum() {
    var randLoc = Math.floor(Math.random() * this.availableNumList.length);
    this.cellNum = this.availableNumList[randLoc];
    this.removeNumber(this.cellNum);
  }

  get topLeftCell(){ // returns two digit number (ie. 36)
    this.x = this.cellName.charAt(0);
    this.y = this.cellName.charAt(1);
    var foundX = false;
    var foundY = false;
    var test = 0;
    while (!foundX && !foundY && test < 10){
      if(!foundX){
        if (this.x == 0 || this.x == 3 || this.x == 6){
          foundX = true;
        }else {
          this.x--;
        }
      }
      if(!foundY){
        if (this.y == 0 || this.y == 3 || this.y == 6){
          foundY = true;
        }else {
          this.y--;
        }
      }
    }
    return "" + this.x + this.y;
  }

  get availableNum(){
    return this.availableNumList;
  }

  get cellName() {
    return this.cellID;
  }
}
