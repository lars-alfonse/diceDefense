"use strict"
function add(sum, value){
	return sum + value;
}
function uniqueDice(value, index, self){
	return self.indexOf(value) === index;
}
function diceAllocation(){
	var diceReserve;
	diceReserve = [20, 12, 12, 10, 10, 8, 8, 6, 6, 6, 4, 4, 4]
	var attackDice;
	var currentDice;
	var defenseDice;
	var speedDice;
	attackDice = [];
	defenseDice = [];
	speedDice = [];
	var userDieChoice;
	while (diceReserve.length > 0) {
		userDieChoice = prompt("You currently have the following dice " + diceReserve + " where would you like the next die to go?" , "defense, speed, attack");
		if (userDieChoice === "Defense" || userDieChoice === "defense"){
			defenseDice.push(diceReserve[diceReserve.length - 1]);
			diceReserve.pop();
		}
		else if (userDieChoice === "attack" || userDieChoice === "Attack"){
			attackDice.push(diceReserve[diceReserve.length - 1]);
			diceReserve.pop();
		}
		else if(userDieChoice === "Speed" || userDieChoice === "speed"){
			speedDice.push(diceReserve[diceReserve.length - 1]);
			diceReserve.pop();
		}
		else {
			alert("incorrect Entry");
		}
	}
	defenseDice = defenseDice.join(" ");
	attackDice = attackDice.join(" ");
	speedDice = speedDice.join(" ");
	currentDice =  defenseDice + "/" + attackDice + "/" + speedDice;
	return currentDice;
}
function determineStats(){

}
function diceRoll(dieValue, frequency){
	var dieResult;
	var diceResult;
	diceResult = [];
	for (var i = 0; i < frequency; i++) {
		dieResult = Math.floor(Math.random()*dieValue + 1);
		if (dieResult === dieValue){
			dieResult = dieResult*1.5;
		}
		console.log(dieResult);
		diceResult.push(dieResult);
	}
	return diceResult;
}
function sortDiceForRoll(currentDice){
	var diceSet;
	var diceValue;
	var diceCount;
	var currentDiceValueAndCount;
	currentDiceValueAndCount = [];
	diceSet = currentDice.split("/");
	for (var i = 0; i < diceSet.length; i++) {
		
	}
}
function addDice(diceResult){
	var diceTotal;
	diceTotal = diceResult.reduce(add);
	return diceTotal;
}
function countDice(diceSet, dieValue) {
	var diceAmount;
	var diceCount;
	diceAmount = diceSet.length;
	diceCount  = 0;
	for (var i = 0; i < diceSet.length; i++) {
		if (diceSet[i] === dieValue || diceSet[i]+diceSet[i+1] === dieValue){
			diceCount += 1;
		}
	}
	return diceCount;
}
function separateDice(currentDice){
	var diceSet;
	diceSet = currentDice.split("/");
	return diceSet;
}
function removeRepeatedDiceValues(diceSet){
	var uniqueDiceSet;
	uniqueDiceSet = diceSet.filter( uniqueDice );
	return uniqueDiceSet;
}
function changeDiceStringToNumbers(diceSet){
	var numberDiceArray;
	numberDiceArray = [];
	for (var i = 0; i < diceSet.length; i++) {
		numberDiceArray.push(parseInt(diceSet[i], 10));
	}
	return numberDiceArray;
}
function organizeDice(currentDice){
	var separatedDice;
	currentDice = diceAllocation();
	separatedDice = separateDice(currentDice);
	return separatedDice;
}
/*function sortDiceForRoll(separatedDice){
	var separatedDiceSet;
	var diceValue;
	var diceValuesWithCounts;
	diceValuesWithCounts = [];
	for (var i = 0; i < separatedDice.length; i++) {
		var separatedDiceArray;
		separatedDiceSet = separatedDice[i];
		console.log(separatedDiceSet);
		var diceOptions;
		diceOptions = [20, 12, 10, 8, 6, 4];
		for (var k = 0; k < diceOptions.length; k++) {
		 	var dieValue;
		 	var dieCount;
		 	dieValue = diceOptions[k].toString();
		 	dieCount = countDice(separatedDiceSet, dieValue);
		 	diceValuesWithCounts.push(dieValue,dieCount);
		 	console.log(dieValue, dieCount);
		 } 
	}
	return diceValuesWithCounts;
}*/
var testString;
testString = ["4 6 8 10 20", "4 6 8 12", "4 6 10 12"];
console.log(sortDiceForRoll(testString));