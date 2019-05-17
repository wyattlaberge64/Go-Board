window.onload = setup;

/* Globals */
const classes=["e","b","w"];
var turns=[];
var buttonElement = document.getElementById("next");
var title = document.getElementById("title");
var board = document.getElementById("board");
var rows = document.getElementById("rows");
// Wyatt - change this (so we start at 0)
var turn=-1;
var allCaptures=[0,0];

function setup() {
	title.innerHTML = "Go!";
	boardReset("Here are instructions.");
	buttonElement.innerHTML = "Next";
  turns=firstGame(turns);
  buildBoard();
}

/* Main */
function main() {
  nextTurn();
}

// Populate Turns Array
function randomBoard() {
  turns=[];
  for (let row=0;row<9;row++){
    for (let col=0;col<9;col++){
      turnVal=Math.floor(Math.random()*3);
      turnClass=classes[turnVal];
      let newTurn=[row,col,turnClass];
      turns.push(newTurn);
      }
    }
}	

function firstGame(turns){
	turns = [[4,3,"b",[]],[4,5,"w",[]],[4,4,"b",[]],[3,5,"w",[]],[5,5,"b",[]],[5,6,"w",[]],[6,6,"b",[]],[6,5,"w",[]],[5,4,"b",[]],[7,6,"w",[]],[6,7,"b",[]],[7,7,"w",[]],[6,4,"b",[]],[7,5,"w",[]],[4,6,"b",[]],[5,7,"w",[]],[4,7,"b",[]],[6,8,"w",[6,6],[6,7]],[2,5,"b",[]],[3,6,"w",[]],[2,6,"b",[]],[3,7,"w",[]],[3,4,"b",[]],[4,1,"w",[]],[2,7,"b",[]],[4,8,"w",[4,6],[4,7]],[2,1,"b",[]],[6,2,"w",[]],[5,2,"b",[]],[5,1,"w",[]],[7,2,"b",[]],[2,2,"w",[]],[1,2,"b",[]],[6,3,"w",[]],[7,3,"b",[]],[7,1,"w",[]],[7,4,"b",[]],[2,3,"w",[]],[3,1,"b",[]],[2,4,"w",[]],[3,2,"b",[]],[1,5,"w",[]],[1,6,"b",[]],[1,1,"w",[]],[1,4,"b",[]],[1,3,"w",[]],[0,5,"b",[1,5]],[0,2,"w",[1,2]],[0,4,"b",[]],[0,3,"w",[]],[5,3,"b",[]],[6,1,"w",[]],[8,1,"b",[]],[1,0,"w",[]],[7,0,"b",[]],[8,2,"w",[]],[8,3,"b",[8,2]],[6,0,"w",[]],[4,0,"b",[]],[2,0,"w",[]],[3,0,"b",[]],[0,7,"w",[]],[1,7,"b",[]],[8,5,"w",[]],[4,2,"b",[]],[8,0,"w",[7,0]],[8,2,"b",[]],[8,4,"w",[]],[7,0,"b",[8,0]],[2,8,"w",[]],[1,8,"b",[]],[8,0,"w",[7,0]],[0,1,"b",[]],[0,0,"w",[0,1]],[7,0,"b",[8,0]],[0,6,"w",[]],[0,8,"b",[0,6],[0,7]],[8,0,"w",[7,0]],[0,6,"b",[]],[3,8,"w",]];
	return turns;
}

function buildBoard(){
  while (rows.hasChildNodes()) {   
    rows.removeChild(rows.firstChild);
  }
	for (let row=0;row<9;row++){
    var newRow = document.createElement("li");
    var rowNode = document.createElement("ul"); 
    rowNode.className = "row";
    for (let col=0;col<9;col++){
      var turnNode = document.createElement("li");
      turnNode.className="e";
	    rowNode.appendChild(turnNode);
	  }
    newRow.appendChild(rowNode);
    rows.appendChild(newRow);
	}
}

function nextTurn(){
  turn++;
  if (turn <= turns.length) {
    let row = turns[turn][0];
    let column = turns[turn][1];
    let color= turns[turn][2];
    let captures= turns[turn][3];
    // each LI is a stone.  What should the count be? 
    let stoneCount=(row)*9+column+1;
    // alter LI count by ignoring the extra row LIs
    let stoneCountAdjustment=(Math.floor((stoneCount-1)/9));
    stoneCount=stoneCount+stoneCountAdjustment;
    // console.log("Row: "+row+" Column: "+column+" Stone count = "+stoneCount+" Adjusted count = "+(stoneCount+stoneCountAdjustment)+" Color: "+color);
    var myCol = rows.getElementsByTagName("li")[stoneCount];
    myCol.className=turns[turn][2];
    if (captures&&captures[0]){
      for(let stones = 3; stones < turns[turn].length; stones++){
        captures.push(turns[turn][stones]);
      }
      removeCaptures(captures,color);
    } 
  }
  else {
    alert("End of game.");
  }
}

function boardReset(message){
  board.removeChild(board.childNodes[2]);
  var messageArea = document.createElement("p");
  messageArea.innerHTML=message;
  board.appendChild(messageArea);
}


function removeCaptures(captures,color){
	let aC = 0;
	if (color = "w") aC = 1;
	allCaptures[aC]+=turns[turn].length-3;
	alert(allCaptures);
	for(let stones = 3; stones < turns[turn].length; stones++){
        let row=turns[turn][stones][0];
        let column=turns[turn][stones][1];
        let stoneCount=(row)*9+column+1;
        let stoneCountAdjustment=(Math.floor((stoneCount-1)/9));
        stoneCount=stoneCount+stoneCountAdjustment;
        var myCol = rows.getElementsByTagName("li")[stoneCount];
        myCol.className="e";
    }
}