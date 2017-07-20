var BasicCard = function(front,back) {
	this.front = front;
	this.back = back;

	this.showFront = function() {
		console.log(this.front+"\n");
	};

	this.showBack = function() {
		console.log(this.back+"\n");
	};
}

module.exports = BasicCard;

// var rightAngle = new BasicCard(
//     "What is 90 degree angle?", 
//     "A right angle");

// console.log(rightAngle.front); 

// console.log(rightAngle.back);