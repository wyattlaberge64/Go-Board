function teachingGame(turns){
	turns = [[1,1,"b",2,[]],[1,2,"w",2,[]],[2,2,"b",0,[]],[1,0,"w",0,[]],[1,3,"b",2,[]],[2,1,"w",1,[]],[0,2,"b",1,[1,2]],[0,1,"w",1,[]],[0,0,"b",1,[0,1]],[3,0,"w",1,[]],[2,0,"b",1,[1,0]],[3,1,"w",1,[]],[1,0,"b",1,[]]];
	gameMessages=[[13,"Now, you could. So I'm blocking that."],[12,"And I can't take you back because that would be Ko."],[11,"Yes, I suppose so. Atari!"],[10," Shouldn\t you have said Atari again?"],[9," That would be Ko, but since I can remove the threat, I will."],[8,"Atari"],[7,"Gotcha."],[6,"Atari to you!"],[5,"Atari!"],[1,"Hello"]];
	return turns;
}

function firstGame(turns){
	turns = [[4,3,"b",0,[]],[4,5,"w",0,[]],[4,4,"b",0,[]],[3,5,"w",0,[]],[5,5,"b",0,[]],[5,6,"w",0,[]],[6,6,"b",0,[]],[6,5,"w",0,[]],[5,4,"b",0,[]],[7,6,"w",0,[]],[6,7,"b",0,[]],[7,7,"w",0,[]],[6,4,"b",0,[]],[7,5,"w",0,[]],[4,6,"b",0,[]],[5,7,"w",0,[]],[4,7,"b",0,[]],[6,8,"w",1,[6,6],[6,7]],[2,5,"b",0,[]],[3,6,"w",0,[]],[2,6,"b",0,[]],[3,7,"w",0,[]],[3,4,"b",0,[]],[4,1,"w",0,[]],[2,7,"b",0,[]],[4,8,"w",1,[4,6],[4,7]],[2,1,"b",0,[]],[6,2,"w",0,[]],[5,2,"b",0,[]],[5,1,"w",0,[]],[7,2,"b",0,[]],[2,2,"w",0,[]],[1,2,"b",0,[]],[6,3,"w",0,[]],[7,3,"b",0,[]],[7,1,"w",0,[]],[7,4,"b",0,[]],[2,3,"w",0,[]],[3,1,"b",0,[]],[2,4,"w",0,[]],[3,2,"b",0,[]],[1,5,"w",0,[]],[1,6,"b",0,[]],[1,1,"w",0,[]],[1,4,"b",0,[]],[1,3,"w",0,[]],[0,5,"b",1,[1,5]],[0,2,"w",1,[1,2]],[0,4,"b",0,[]],[0,3,"w",0,[]],[5,3,"b",0,[]],[6,1,"w",0,[]],[8,1,"b",0,[]],[1,0,"w",0,[]],[7,0,"b",0,[]],[8,2,"w",0,[]],[8,3,"b",1,[8,2]],[6,0,"w",0,[]],[4,0,"b",0,[]],[2,0,"w",0,[]],[3,0,"b",0,[]],[0,7,"w",0,[]],[1,7,"b",0,[]],[8,5,"w",0,[]],[4,2,"b",0,[]],[8,0,"w",0,[7,0]],[8,2,"b",0,[]],[8,4,"w",0,[]],[7,0,"b",0,[8,0]],[2,8,"w",0,[]],[1,8,"b",0,[]],[8,0,"w",1,[7,0]],[0,1,"b",0,[]],[0,0,"w",0,[0,1]],[7,0,"b",0,[8,0]],[0,6,"w",0,[]],[0,8,"b",1,[0,6],[0,7]],[8,0,"w",0,[7,0]],[0,6,"b",0,[]],[3,8,"w",0,[]]];	
	gameMessages=[[18,"First capture of the game"],[26,"b has been captured again"],[47,"b\'s first capture"],[48,"w retaliates by capturing another one of b\'s stone"],[57,"b makes another capture to try to make up for lost ground"],[72,"We got ourselves a back \'n\' forth going on here"],[74,"w makes a new capture"]];
	return turns;
}

/* Interactions */
function hello(){
	let status = prompt("How are you? ");
	if (status == "ok"){
		alert("good");
	}
	else alert("sorry to here that.");
}

function blockAtari(){
	let userTurn = prompt("Enter a turn to block this atari [row, column]");
	let userRow = userTurn.substring(0,1);
	let userColumn = userTurn.substring(2);
	if(userRow == "0" && userColumn == "2"){
		alert("Correct!\n But white did something else.")
	}
	else{
		alert("Incorrect!\n The correct answer was 0,2\n But white did something else.");
	}
}