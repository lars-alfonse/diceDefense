"use strict"
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
	currentDice =  defenseDice + "/" + attackDice + "/" + speedDice + "/";
	return currentDice;
}
function determineStats(currentDice){
	var diceSet;
	diceSet = currentDice.split("/");
	for (var i = 0; i < diceSet.length; i++) {
		diceSet[i]
	}
}
function diceRoll(dieValue, frequency){
	var diceTotal;
	var dieResult;
	var diceResult;
	diceResult = [];
	for (var i = 0; i < frequency; i++) {
		dieResult = Math.floor(Math.random()*dieValue + 1);
		console.log(dieResult);
		diceResult.push(dieResult);
	}
	return diceResult;
}	
console.log(diceRoll(6,3));