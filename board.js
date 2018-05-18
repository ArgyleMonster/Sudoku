class Board {
  constructor(){
    this.cellList = {};
    console.log(this.cellList);
  }

  generateCellClasses(){
    for (var x = 0; x <= 8; x++) {
      for (var y = 0; y <= 8; y++) {
        var cellName = "cell" + x + y;
        this.cellList[cellName] = new Cell(x,y);
      }
    }
    var a = 3;
    var b = 4;

  }

  fillFirstThreeBoxes() { //Fill three diagonal boxes
    var boxesToFill = [['cell',0,0],['cell',3,3],['cell',6,6]];
    var numOfBoxes = boxesToFill.length;
    for (var i = 0; i <= numOfBoxes; i++){
      var yOriginal = boxesToFill[0][2];
      for (var y = boxesToFill[0][2]; y < yOriginal + 3; y++){
        for (var x = boxesToFill[0][1]; x < 3; x++){
          var currentCell = this.cell(x,y);
        }
      }
    }
  }

  fillBox(x,y){
    // console.log('1');
    // var topLeftCell = String(this.topLeftCell(x,y));
    // var boxlength = topLeftCell[0] + 3;
    // var boxheight = topLeftCell[1] + 3;
    // for (var y = 0; y < 3; y++){
    //   console.log('2');
    //   for (var x = 0; x < 3; x++){
    //       var currentCell = this.cellList['cell' + x + y];
    //       console.log(currentCell);
    //   }
    // }
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

  topLeftCell(x,y){ // returns list of two numbers ie [3,6]
    this.x = x;
    this.y = y;
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
    return [this.x, this.y]
  }

}

class Cell {
  constructor(x,y){
    var cellNum; //final generated number for the cell
    // super(cellNum);
    this.availableNumList = [1,2,3,4,5,6,7,8,9];
    this.cellID = "" + x + y;
    this.htmlTD = document.getElementById(this.cellID);
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
     this.htmlTD.innerHTML = this.cellNum;
  }

  generateNum() {
    var randLoc = Math.floor(Math.random() * this.availableNumList.length);
    this.cellNum = this.availableNumList[randLoc];
    this.removeNumber(this.cellNum);
  }


  get availableNum(){
    return this.availableNumList;
  }

  get cellName() {
    return this.cellID;
  }
}
