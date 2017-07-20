var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var cardList = [];
var basicCardList = [];
var clozeCardList = [];
addBasicCards();
addClozeCards();

var chooseCards = {
	type:"list",
	message:"Which cards would you like to use?",
	choices:["Basic","Cloze","Both"],
	name:"type"
}

var answerCard = {
	type:"input",
	message:"A: ",
	name:"answer"
}

inquirer.prompt(chooseCards).then(selectCardList);

function selectCardList(res) {
	console.log("Try to answer the following questions:\n");

	switch(res.type) {
		case "Basic":
			useCard(basicCardList,0);
			break;

		case "Cloze":
			useCard(clozeCardList,0);
			break;

		case "Both":
			useCard(cardList,0);
			break;

		default:
			console.log("There was an error\n");
			return;
			break;
	}

}

function addBasicCards() {
	fs.readFile("basicCardList.txt","utf8",function(err,data) {
		// console.log(data);
		var fileStingArr = data.split("-#@-");
		// console.log(fileStingArr);
		for(var i=0;i<fileStingArr.length;i+=2) {
			if(fileStingArr[i]) {
				cardList.push(new BasicCard(fileStingArr[i],fileStingArr[i+1]));
				basicCardList.push(new BasicCard(fileStingArr[i],fileStingArr[i+1]));
				// i++;
			}
		}
		shuffleElements(basicCardList);
		shuffleElements(cardList);
		// console.log(cardList);

	});
}

function addClozeCards() {
	fs.readFile("clozeCardList.txt","utf8",function(err,data) {
		// console.log(data);
		var fileStingArr = data.split("-#@-");
		// console.log(fileStingArr);
		for(var i=0;i<fileStingArr.length;i+=2) {
			if(fileStingArr[i]) {
				cardList.push(new ClozeCard(fileStingArr[i],fileStingArr[i+1]));
				clozeCardList.push(new ClozeCard(fileStingArr[i],fileStingArr[i+1]));
				// i++;
			}
		}
		shuffleElements(clozeCardList);
		shuffleElements(cardList);
		// console.log(cardList);
	});
}

function useCard(cards,i) {
	if (i === cards.length) {
		console.log("No more cards \nGoodbye");
		return;
	}

	cards[i].showFront();

	inquirer.prompt(answerCard).then(function(res) {
		cards[i].showBack();
		if(cards[i].answer === res.answer) {
			console.log("That's correct\n");
		}

		else {
			console.log("That's incorrect\n");
		}

		return useCard(cards,++i);
	});

}

// function checkBack(res) {
	
// }


// Shuffles the elements of an array
function shuffleElements (arr) {

	for (var i = 0; i <64; i++) {
		var a = Math.floor(Math.random()*arr.length);
		var b = Math.floor(Math.random()*arr.length);
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}

	return arr;
}