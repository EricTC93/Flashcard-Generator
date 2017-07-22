// Constructor CLozeCard

// A cloze flashcard has a fill in the blank question on the front and the answer on the back
var ClozeCard = function(text,cloze) {
	this.fullText = text;
	this.cloze = cloze;

	var blank = "";
	for(var i = 0; i<cloze.length; i++) {
		blank+="_";
	}

	this.partial = text.replace(cloze,blank);

	// Test the validity of the cloze card
	if (this.partial === text) {
		console.log("This can't be a Cloze Card.\n");
		this.valid = false;
		return;
	}

	this.answer = this.cloze;
	this.valid = true;

	this.showFront = function() {
		console.log(this.partial);
	};

	this.showBack = function() {
		console.log(this.cloze);
	};
}

module.exports = ClozeCard;

// var supplementary = new ClozeCard(
//     "If two angles are supplementary then their total is 180 degrees", 
//     "supplementary");

// console.log(supplementary.cloze); 

// console.log(supplementary.partial);

// console.log(supplementary.fullText);


// var brokenCloze = new ClozeCard("This doesn't work", "oops");

// console.log(brokenCloze.cloze);

// console.log(brokenCloze.partial);

// console.log(brokenCloze.fullText);

// console.log(brokenCloze.valid);