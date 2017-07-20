"use strict"
function add(sum, value){
	return sum + value;
}
function diceRoll(dieValue){
	var dieResult;
	dieResult = Math.floor(Math.random()*dieValue + 1);
	if (dieResult === dieValue) {
		dieResult = dieResult * 1.5;
	}
	return dieResult;
}
function addDice(diceResult){
	var diceTotal;
	diceResult = diceResult.concat(0);
	diceTotal = diceResult.reduce(add);
	return diceTotal;
}
function reportStats(){

}
function collectDiceResults(diceSet){
		var diceResults;
		var dieResult;
		diceResults = [];
		for (var i = 0; i < diceSet.length; i++) {
			dieResult = diceRoll(diceSet[i]);
			console.log(dieResult);
			diceResults.push(dieResult);
		}
		dieResult = addDice(diceResults);
	return dieResult;
}
function selectPlayerDice(player, type) {
	var selectedDice;
	var selectedDiceKit;
	selectedDice = [];
	selectedDiceKit = [];
	var playerUser;
	playerUser = document.getElementById('player'+player);
	selectedDice = playerUser.getElementsByClassName(type);
	for (var i = 0; i < selectedDice.length; i++) {
		if(selectedDice[i].checked){
			selectedDiceKit.push(parseInt(selectedDice[i].value, 10));
		}
	}
	return selectedDiceKit;
}
function startCombat(playerOneAttack, playerOneDefense, playerOneSpeed, playerTwoAttack, playerTwoDefense, playerTwoSpeed, hitPoints){
	var playerOneInitiative;
	var playerTwoInitiative;
	var playerOneAttackMultiplier;
	var playerTwoAttackMultiplier;
	playerOneInitiative = determineInitiative(playerOneSpeed, playerTwoSpeed);
	playerTwoInitiative = determineInitiative(playerTwoSpeed, playerOneSpeed);
	playerOneAttackMultiplier = determineAttackMultiplier(playerOneSpeed, playerTwoSpeed);
	playerTwoAttackMultiplier = determineAttackMultiplier(playerTwoSpeed, playerOneSpeed);
	playerOneAttack =  playerOneAttackMultiplier * playerOneAttack;
	playerTwoAttack = playerTwoAttackMultiplier * playerTwoAttack;
	hitPoints = damageStep(playerOneAttack, playerOneDefense, playerOneInitiative, playerTwoAttack, playerTwoDefense, playerTwoInitiative, hitPoints);
	return hitPoints;
}
function damageStep(playerOneAttack, playerOneDefense, playerOneInitiative, playerTwoAttack, playerTwoDefense, playerTwoInitiative, hitPoints){
	if (playerOneInitiative > playerTwoInitiative) {
		if (playerOneAttack > playerTwoDefense) {
			hitPoints[1] = hitPoints[1] - 1;
			}
		if (hitPoints[1] === 0) {
			return hitPoints;
		}
		else if(playerTwoAttack > playerOneDefense) {
			hitPoints[0] -= 1;
		}
	}
	else{
		if (playerTwoAttack > playerOneDefense) {
			hitPoints[0] = hitPoints[0] - 1;
		}
		if (hitPoints[0] ===  0) {
			return hitPoints;
		}
		else if(playerOneAttack > playerTwoDefense){
			hitPoints[1] = hitPoints[1] - 1;
		}
	}
	return hitPoints;
}
function determineInitiative(firstSpeed, secondSpeed){
	var initiative;
	firstSpeed > secondSpeed ? initiative = 1 : initiative = 0;
	return initiative;
}
function determineDefender(firstAttacker){
	var firstDefender;
	firstAttacker === "playerOne" ? firstDefender = "playerOne" : firstDefender = "playerTwo";
	return firstDefender;
}
function determineAttackMultiplier(firstSpeed, secondSpeed){
	var attackMultiplier;
	attackMultiplier = firstSpeed / secondSpeed;
	attackMultiplier <= 1 ? attackMultiplier = 1 : attackMultiplier = attackMultiplier;
	return attackMultiplier;
}
function startGame(){
	var hitPoints;
	hitPoints = [3, 3];
	var playerOneAttack;
	var playerOneDefense;
	var playerOneSpeed;
	var playerOne = "One";
	var playerTwo = "Two";
	while (hitPoints[0] > 0 && hitPoints[1] > 0){
	playerOneAttack = selectPlayerDice(playerOne, "attack");
	playerOneDefense = selectPlayerDice(playerOne, "defense");
	playerOneSpeed = selectPlayerDice(playerOne, "speed");
	var playerTwoAttack = selectPlayerDice(playerTwo, "attack");
	var playerTwoDefense = selectPlayerDice(playerTwo, "defense");
	var playerTwoSpeed = selectPlayerDice(playerTwo, "speed");
	playerOneAttack = collectDiceResults(playerOneAttack);
	playerOneDefense = collectDiceResults(playerOneDefense);
	playerOneSpeed = collectDiceResults(playerOneSpeed);
	playerTwoAttack = collectDiceResults(playerTwoAttack);
	playerTwoDefense = collectDiceResults(playerTwoDefense);
	playerTwoSpeed = collectDiceResults(playerTwoSpeed);
		hitPoints = startCombat(playerOneAttack, playerOneDefense, playerOneSpeed, playerTwoAttack, playerTwoDefense, playerTwoSpeed, hitPoints);
	}
	if (hitPoints[0] === 0){
		console.log("Player one loses");
	}
	else{
		console.log("player two loses");
	}
}