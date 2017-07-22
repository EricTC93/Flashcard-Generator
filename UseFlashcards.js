// Shows the cards that are stored in the text files to the user

// Requires the necessary files
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

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

var correctCount = 0;
var incorrectCount = 0;

// Creates card list
var cardList = [];
var basicCardList = [];
var clozeCardList = [];
addBasicCards(); // addBasicCards -> addClozeCards -> inquirer.prompt(chooseCards).then(selectCardList)

// Selects which type of cards the user wants
function selectCardList(res) {
	console.log("Try to answer the following questions:");

	switch(res.type) {
		case "Basic":
			console.log("There are " + basicCardList.length + " basic cards\n");
			useCards(basicCardList,0);
			break;

		case "Cloze":
			console.log("There are " + clozeCardList.length + " cloze cards\n");
			useCards(clozeCardList,0);
			break;

		case "Both":
			console.log("There are " + basicCardList.length + " basic cards");
			console.log("There are " + clozeCardList.length + " cloze cards");
			console.log(cardList.length + " cards in total\n");
			useCards(cardList,0);
			break;

		default:
			console.log("There was an error\n");
			return;
			break;
	}

}

// Adds all stored basic cards into an array
function addBasicCards() {
	fs.readFile("basicCardList.txt","utf8",function(err,data) {
		var fileStingArr = data.split("-#@-");

		for(var i=0;i<fileStingArr.length;i+=2) {
			if(fileStingArr[i]) {
				cardList.push(new BasicCard(fileStingArr[i],fileStingArr[i+1]));
				basicCardList.push(new BasicCard(fileStingArr[i],fileStingArr[i+1]));
			}
		}
		shuffleElements(basicCardList);
		shuffleElements(cardList);

		return addClozeCards();

	});
}

// Adds all stored cloze cards into an array
function addClozeCards() {
	fs.readFile("clozeCardList.txt","utf8",function(err,data) {

		var fileStingArr = data.split("-#@-");

		for(var i=0;i<fileStingArr.length;i+=2) {
			if(fileStingArr[i]) {
				cardList.push(new ClozeCard(fileStingArr[i],fileStingArr[i+1]));
				clozeCardList.push(new ClozeCard(fileStingArr[i],fileStingArr[i+1]));
			}
		}
		shuffleElements(clozeCardList);
		shuffleElements(cardList);

		return inquirer.prompt(chooseCards).then(selectCardList);
	});
}

// Shows the front of the card to the user and asks for an answer
// Loops through cards(array) using i(index)
function useCards(cards,i) {
	if (i === cards.length) {
		console.log("No more cards");
		console.log("You got " + correctCount + " right and " + incorrectCount + " wrong");
		console.log("Goodbye");
		return;
	}

	cards[i].showFront();

	// Prompts user to enter an answer
	inquirer.prompt(answerCard).then(function(res) {
		cards[i].showBack();
		if(cards[i].answer.toLowerCase() === res.answer.toLowerCase()) {
			correctCount++;
			console.log("That's correct\n");
		}

		else {
			incorrectCount++;
			console.log("That's incorrect\n");
		}

		return useCards(cards,++i);
	});

}

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