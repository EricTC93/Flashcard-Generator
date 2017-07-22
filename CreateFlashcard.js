// Let's user create a card using text input

// Requires the necessary files
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");


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

// Ask the user what type of card the user wants to make
inquirer.prompt(cardTypeQues).then(cardGenerator);

// Selects which card to create based on user input
function cardGenerator(res) {

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
			inquirer.prompt(cardTypeQues).then(cardGenerator);
			break;
	}
};

// Creates a basic card from user input
function createBasic(res) {
	if (!res.front || !res.back) {
		console.log("Requires input");
		console.log("Basic card couldn't be created\n");
		return inquirer.prompt(cardTypeQues).then(cardGenerator);
	}

	// Appends basic card string to a file
	var string = res.front + "-#@-" + res.back + "-#@-";
	fs.appendFile("basicCardList.txt",string,function(err){
		if (err) throw err;
	});

	console.log("Basic card created.\n");

	return inquirer.prompt(cardTypeQues).then(cardGenerator);

};

// Creates a cloze card from user input
function createCloze(res) {
	if (!res.text || !res.cloze) {
		console.log("Requires input");
		console.log("Cloze card couldn't be created\n");
		return inquirer.prompt(cardTypeQues).then(cardGenerator);
	}

	// Tests the clozde cards validity
	var testCard = new ClozeCard (
    	res.text, 
    	res.cloze);

    if (testCard.valid === false) {
    	console.log("Input is not valid");
    	console.log("Cloze card couldn't be created\n");
    	return inquirer.prompt(cardTypeQues).then(cardGenerator);
    } 

    // Appends cloze card string to a file
	var string = res.text + "-#@-" + res.cloze + "-#@-";
	fs.appendFile("clozeCardList.txt",string,function(err){
		if (err) throw err;
	});

	console.log("Cloze card created.\n");

	return inquirer.prompt(cardTypeQues).then(cardGenerator);
};