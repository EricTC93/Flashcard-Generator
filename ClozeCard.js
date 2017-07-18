var ClozeCard = function(text,cloze) {
	this.fullText = text;
	this.cloze = cloze;

	var blank = "";
	for(var i = 0; i<cloze.length; i++) {
		blank+="_";
	}

	this.partial = text.replace(cloze,blank);
}

module.exports = ClozeCard;

var supplementary = new ClozeCard(
    "If two angles are supplementary then there total is 180 degrees", 
    "supplementary");

console.log(supplementary.cloze); 

console.log(supplementary.partial);

console.log(supplementary.fullText);

var brokenCloze = new ClozeCard("This doesn't work", "oops");