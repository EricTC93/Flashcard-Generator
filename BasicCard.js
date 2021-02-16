// Constructor BasicCard

// A basic flashcard has the question on the front and the answer on the back
var BasicCard = function(front,back) {
	this.front = front;
	this.back = back;
	this.answer = this.back;
}

BasicCard.prototype.showFront = function() {
  console.log(this.front);
};

BasicCard.prototype.showBack = function() {
  console.log(this.back);
};

module.exports = BasicCard;

// var rightAngle = new BasicCard(
//     "What is 90 degree angle?", 
//     "A right angle");

// console.log(rightAngle.front); 

// console.log(rightAngle.back);