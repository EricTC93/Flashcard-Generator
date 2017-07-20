var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var cardList = [];

var chooseCards = {
	type:"list",
	message:"Which cards would you like to use?",
	choices:["Basic","Cloze","Both"],
	name:"type"
}

inquirer.prompt(chooseCards).then(createCardList);

function createCardList(res) {
	switch(res.type) {
		case "Basic":
			addBasicCards();
			break;

		case "Cloze":
			addClozeCards();
			break;

		case "Both":
			addBasicCards();
			addClozeCards();
			break;

		default:
			console.log("There was an error\n");
			
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
				// i++;
			}
		}
		shuffleElements(cardList);
		console.log(cardList);
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
				// i++;
			}
		}
		shuffleElements(cardList);
		console.log(cardList);
	});
}

function useCards() {
	
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