

window.onload = function() {
  for (var rowNum = 0; rowNum <= 8; rowNum++){
    for (var collumnNum = 0; collumnNum <= 8; collumnNum++){
      curBox = rowNum.toString() + collumnNum.toString();
      var possibleNums = [1,2,3,4,5,6,7,8,9];
      for (var testCollumn = 0; testCollumn <= 8; testCollumn++) {
        checkCellNum = rowNum.toString() + testCollumn.toString();
        checkCell = document.getElementById(checkCellNum);
        if (possibleNums.includes(parseInt(checkCell.innerHTML))) {
          console.log("found: " + checkCell.innerHTML)
          var index = possibleNums.indexOf(checkCell.innerHTML);
          if (index > -1) {
            possibleNums.splice(checkCell.innerHTML, 1);
          }
        }
        console.log(curBox);
      }
    }
  }
}
