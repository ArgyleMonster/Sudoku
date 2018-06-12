function GM(){

}

function Board(){

}


function Cell(xCoord, yCoord){
  this.base = Board
  this.base()
}

let cell57 = new Cell(5,7)

console.log(Object.getPrototypeOf(cell57))
