var BasicCard = function(ques,ans) {
	return {
		front:ques,
		back:ans
	};
}

module.exports = BasicCard;

var firstPresident = new BasicCard(
    "What is 90 degree angle?", 
    "A right angle");

console.log(firstPresident.front); 

console.log(firstPresident.back);