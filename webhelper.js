window.onload = setup;

/* Globals */
const classes=["b","w","e","n"];
var turns=[];
var buttonElement = document.getElementById("next");
var title = document.getElementById("title");
var board = document.getElementById("board");
var rows = document.getElementById("rows");
var allStones = rows.getElementsByTagName("li");
var deadstones=document.getElementById("deadstones");
var scoreboard=document.getElementById("scoreboard");
var messages=document.getElementById("messages");
var turn=-1;
var row=-1;
var column=-1;
var allCaptures=[0,0];
var newCaptures=[];
var oldCaptures=[];
var backwards = false;

function setup() {
	title.innerHTML = "Go!";
	buttonElement.innerHTML = "Next";
	turns=firstGame(turns);
	buildBoard();
	for (i=1;i<17;i++){
		turn++;
		nextTurn("next");
	}
	
}

/* Main */
function main() {
	if(backwards==true){
		backwards=false;
		nextTurn("next");
	}
	else {
		turn++;
		nextTurn("next");
	}
}	

function firstGame(turns){
	turns = [[4,3,"b",[]],[4,5,"w",[]],[4,4,"b",[]],[3,5,"w",[]],[5,5,"b",[]],[5,6,"w",[]],[6,6,"b",[]],[6,5,"w",[]],[5,4,"b",[]],[7,6,"w",[]],[6,7,"b",[]],[7,7,"w",[]],[6,4,"b",[]],[7,5,"w",[]],[4,6,"b",[]],[5,7,"w",[]],[4,7,"b",[]],[6,8,"w",[6,6],[6,7]],[2,5,"b",[]],[3,6,"w",[]],[2,6,"b",[]],[3,7,"w",[]],[3,4,"b",[]],[4,1,"w",[]],[2,7,"b",[]],[4,8,"w",[4,6],[4,7]],[2,1,"b",[]],[6,2,"w",[]],[5,2,"b",[]],[5,1,"w",[]],[7,2,"b",[]],[2,2,"w",[]],[1,2,"b",[]],[6,3,"w",[]],[7,3,"b",[]],[7,1,"w",[]],[7,4,"b",[]],[2,3,"w",[]],[3,1,"b",[]],[2,4,"w",[]],[3,2,"b",[]],[1,5,"w",[]],[1,6,"b",[]],[1,1,"w",[]],[1,4,"b",[]],[1,3,"w",[]],[0,5,"b",[1,5]],[0,2,"w",[1,2]],[0,4,"b",[]],[0,3,"w",[]],[5,3,"b",[]],[6,1,"w",[]],[8,1,"b",[]],[1,0,"w",[]],[7,0,"b",[]],[8,2,"w",[]],[8,3,"b",[8,2]],[6,0,"w",[]],[4,0,"b",[]],[2,0,"w",[]],[3,0,"b",[]],[0,7,"w",[]],[1,7,"b",[]],[8,5,"w",[]],[4,2,"b",[]],[8,0,"w",[7,0]],[8,2,"b",[]],[8,4,"w",[]],[7,0,"b",[8,0]],[2,8,"w",[]],[1,8,"b",[]],[8,0,"w",[7,0]],[0,1,"b",[]],[0,0,"w",[0,1]],[7,0,"b",[8,0]],[0,6,"w",[]],[0,8,"b",[0,6],[0,7]],[8,0,"w",[7,0]],[0,6,"b",[]],[3,8,"w",]];
	gameMessages=[[18,"First capture of the game"],[26,"b has been captured again"],[47,"b\'s first capture"],[48,"w retaliates by capturing another one of b\'s stone"],[57,"b makes another capture to try to make up for lost ground"],[72,"We got ourselves a back \'n\' forth going on here"],[74,"w makes a new capture"]];
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

function nextTurn(next){
	if (turn+1 <= turns.length) {
		// remove red circles from board and clear oldCaptures
		if (turn>1 && turns[turn-1][3][0]>-1) removeCaptures(oldCaptures,"e");
		// place new stone with color 
		row = turns[turn][0];
		column = turns[turn][1];
		color= turns[turn][2];
		let stoneCount=getStoneCount(row,column);
		let newStone = allStones[stoneCount];
		console.log("Turn: "+(turn+1)+" row: "+row+" column: "+column+" color: "+color);
		// determine color based on function parameter indicating next / previous 
		newStone.className = (next=="next") ? turns[turn][2] : "e";
		// clear previous messages
		refreshBox(messages,"","text");
		// check for new messages
		showMessage(turn);
		// check for new captures and process them, leaving red circles
		if (turns[turn][3][0]>-1) checkCaptures(turn);
	}
	else 
	{
		alert("End of game.");
	}
}

function getStoneCount(row,column){
	// each LI is a stone.  What should the count be? 
	let stoneCount=(row)*9+column+1;
	// alter LI count by ignoring the extra row LIs
	let stoneCountAdjustment=(Math.floor((stoneCount-1)/9));
	stoneCount=stoneCount+stoneCountAdjustment;
	return stoneCount;
}

function checkCaptures(turn){
	if(backwards==false){
		// get captures from turns array
		newCaptures=createCapturesArray(turn);
		// add captures to score
		addCapturesToScore(newCaptures,color);
		// empy newCaptures array and replace with red circles
		oldCaptures=removeCaptures(newCaptures,"captured");
	}
	else{
		// get captures from previous turn
		newCaptures=createCapturesArray(turn-1);
		// remove captures from score
		addCapturesToScore(newCaptures*-1,color);
		// remove red stones from board
		oldCaptures=removeCaptures(newCaptures,"captured");
	}
}

function createCapturesArray(turn){
	newCaptures=[];
	// populate captures array and color them red
	for (let stone = 3; stone < turns[turn].length; stone++){
		newCaptures.push(turns[turn][stone]);
	}
	return newCaptures;
}

function addCapturesToScore(captures,color){
	let classElement=0;
	while(classes[classElement]!=color){
		classElement++;
	}
	if(backwards==false){
		allCaptures[classElement]+=newCaptures.length;
	}
	else{
		allCaptures[classElement]-=newCaptures.length;
		console.log(allCaptures[classElement]+ "test "+newCaptures.length);
	}
	refreshBox(scoreboard,allCaptures.join("|"), "text");
	graveyard=deadstoneFiller(allCaptures);
	refreshBox(deadstones,graveyard, "node");
}

/* removeCaptures changes color of stones sent as an array of ordered pairs, and saves to score */
function removeCaptures(captures,capColor){
	// for each captured stone
	for (let stone = 0; stone < captures.length; stone++){
		// count stones until captured stone
        let row=newCaptures[stone][0];
        let column=newCaptures[stone][1];
        let stoneCount=row*9+column+1;
		stoneCount=getStoneCount(row,column);
		let newStone = allStones[stoneCount];
		newStone.className=capColor;
    }
	// if we're removing previous captures
	if (capColor=="e") {
		console.log("Turn: "+(turn+1)+" New Captures: "+newCaptures.join("|")+"Old Captures: "+oldCaptures.join("|")+" Color: "+color+" CaptureColor: "+capColor);
		oldCaptures=[];
	}
	// if we're removing new captures
	else { 
		newCaptures=captures.slice();
		console.log("Turn: "+(turn+1)+" New Captures: "+newCaptures.join("|")+"Old Captures: "+oldCaptures.join("|")+" Color: "+color+" CaptureColor: "+capColor);
		oldCaptures=captures.slice();
		newCaptures=[];
	}
}

function removeOldCaptures(oldCaptures){
	if (oldCaptures.length>0){
		removeCaptures(oldCaptures,"n","e");
		oldCaptures=[];
	}
	return oldCaptures;
}

function refreshBox(element,newValue,type){
	var newContent = document.createElement("div");
	newContent.className = "content";
	if (type=="text"){
		var textnode = document.createTextNode(newValue);
		newContent.appendChild(textnode);
	}
	else if (type=="node"){
		newContent.appendChild(graveyard);
	}
	else alert("Wrong type specified in refreshBox call parameter 3");
	var elementKids=element.childNodes[3];
	element.replaceChild(newContent,elementKids);
}

/* check for messages and display them */
function showMessage(turn){
	// cycle through all messages
	let messageMatch=0;
	let clearMessage=false;
	while (messageMatch < gameMessages.length){
		// see if there is a message for this turn
		if (gameMessages[messageMatch][0]==turn+1) {
			clearMessage=true;
			refreshBox(messages,gameMessages[messageMatch][1],"text");
		}
		messageMatch++;
	}
	return clearMessage;
}

function deadstoneFiller(allCaptures){
	var graveyard = document.createElement("ul");
	for (let stoneColor=0;stoneColor<2;stoneColor++){
		for (let stoneCount=0;stoneCount<allCaptures[stoneColor];stoneCount++){
			var newStone = document.createElement("li");
			newStone.className = classes[1-stoneColor];
			graveyard.appendChild(newStone);
		}
	}
	return graveyard;		
}

function reverseMain(){
	if(backwards==false){
		backwards=true;
		removeLastTurn();
	}
	else{
		turn--;
		removeLastTurn();
	}
}

function removeLastTurn(){
	if(turn<0){
		alert("Game empty press next button");
	}
	else{
		nextTurn("previous");
	}
}