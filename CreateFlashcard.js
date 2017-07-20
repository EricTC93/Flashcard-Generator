var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var basicCardList = [];
var clozeCardList = [];

// var nodeArr = process.argv;

// var type = nodeArr[2];

var cardTypeQues = [{
	type:"list",
	message:"What type of card do you want to make?",
	choices:["Basic","Cloze","Exit"],
	name:"type"
}];

var basicCardGenerator = [{
	type:"input",
	message:"What's the question?",
	name:"front"
},{
	type:"input",
	message:"What's the answer?",
	name:"back"
}];

var clozeCardGenerator = [{
	type:"input",
	message:"What's the full text sentence?",
	name:"text"
},{
	type:"input",
	message:"What's the answer you want to omit?",
	name:"cloze"
}];

inquirer.prompt(cardTypeQues).then(createCard);

function createCard(res) {
	// console.log(res);

	switch(res.type) {
		case "Basic":
			inquirer.prompt(basicCardGenerator).then(createBasic);
			break;

		case "Cloze":
			inquirer.prompt(clozeCardGenerator).then(createCloze);
			break;

		case "Exit":
			return console.log("Goodbye");

		default:
			console.log("There was an error\n");
			inquirer.prompt(cardTypeQues).then(createCard);
			break;
	}
};

function createBasic(res) {
	if (!res.front || !res.back) {
		console.log("Requires input\n");
		return inquirer.prompt(cardTypeQues).then(createCard);
	}

	var string = res.front + "-#@-" + res.back + "-#@-";
	fs.appendFile("basicCardList.txt",string,function(err){
		if (err) throw err;
	});

	console.log("Basic card created.\n");

	return inquirer.prompt(cardTypeQues).then(createCard);

	// basicCardList.push(
	// 	new BasicCard (
 //    	res.front, 
 //    	res.back)
	// );

	// console.log(basicCardList);
};

function createCloze(res) {
	if (!res.text || !res.cloze) {
		console.log("Requires input\n");
		return inquirer.prompt(cardTypeQues).then(createCard);
	}

	var testCard = new ClozeCard (
    	res.text, 
    	res.cloze);

    if (testCard.valid === false) {
    	return inquirer.prompt(cardTypeQues).then(createCard);
    } 

	var string = res.text + "-#@-" + res.cloze + "-#@-";
	fs.appendFile("clozeCardList.txt",string,function(err){
		if (err) throw err;
	});

	console.log("Cloze card created.\n");

	return inquirer.prompt(cardTypeQues).then(createCard);

	// clozeCardList.push(
		// new ClozeCard (
  //   	res.text, 
  //   	res.cloze)
	// );

	// console.log(clozeCardList);
};

// var rightAngle = new BasicCard(
//     "What is 90 degree angle?", 
//     "A right angle");

// console.log(rightAngle.front); 

// console.log(rightAngle.back);

// var supplementary = new ClozeCard(
//     "If two angles are supplementary then their total is 180 degrees", 
//     "supplementary");

// console.log(supplementary.cloze); 

// console.log(supplementary.partial);

// console.log(supplementary.fullText);

// var brokenCloze = new ClozeCard("This doesn't work", "oops");

// console.log(brokenCloze.valid);