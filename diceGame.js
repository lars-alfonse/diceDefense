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
function reportStats(playerOne, playerTwo){
	document.getElementById("playerOneResults").innerHTML = "<h1 class='resultHeader'> Player 1:</h1> <br/> <p class='resultText'> Attack: " +playerOne.attack+"<br/> Defense: " +playerOne.defense+"<br/> Speed: " +playerOne.speed+"<br/> Initiative: " +playerOne.initiative+"<br/> Multiplier: " +playerOne.multiplier+"</p>";
	document.getElementById("playerTwoResults").innerHTML = "<h1 class='resultHeader'>Player 2: </h1> <br/> <p class='resultText'> Attack: " +playerTwo.attack+"<br/> Defense: " +playerTwo.defense+"<br/> Speed: " +playerTwo.speed+"<br/> Initiative: " +playerTwo.initiative+"<br/> Multiplier: " +playerTwo.multiplier+"</p>";
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
function startCombat(playerOne, playerTwo, hitPoints){
	var playerOneInitiative;
	var playerTwoInitiative;
	var playerOneAttackMultiplier;
	var playerTwoAttackMultiplier;
	playerOneInitiative = determineInitiative(playerOne.speed, playerTwo.speed);
	playerTwoInitiative = determineInitiative(playerTwo.speed, playerOne.speed);
	playerOneAttackMultiplier = determineAttackMultiplier(playerOne.speed, playerTwo.speed);
	playerTwoAttackMultiplier = determineAttackMultiplier(playerTwo.speed, playerOne.speed);
	playerOne.multiplier = playerOneAttackMultiplier;
	playerTwo.multiplier = playerTwoAttackMultiplier;
	playerOne.initiative = playerOneInitiative;
	playerTwo.initiative = playerTwoInitiative;
	reportStats(playerOne, playerTwo);
	playerOne.attack =  playerOneAttackMultiplier * playerOne.attack;
	playerTwo.attack = playerTwoAttackMultiplier * playerTwo.attack;
	hitPoints = damageStep(playerOne, playerTwo, hitPoints);
	return hitPoints;
}
function damageStep(playerOne,  playerTwo, hitPoints){
	if (playerOne.initiative > playerTwo.initiative) {
		if (playerOne.attack > playerTwo.defense) {
			hitPoints[1] = hitPoints[1] - 1;
			}
		if (hitPoints[1] === 0) {
			return hitPoints;
		}
		else if(playerTwo.attack > playerOne.defense) {
			hitPoints[0] -= 1;
		}
	}
	else{
		if (playerTwo.attack > playerOne.defense) {
			hitPoints[0] = hitPoints[0] - 1;
		}
		if (hitPoints[0] ===  0) {
			return hitPoints;
		}
		else if(playerOne.attack > playerTwo.defense){
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
function determineAttackMultiplier(firstSpeed, secondSpeed){
	var attackMultiplier;
	attackMultiplier = firstSpeed / secondSpeed;
	attackMultiplier <= 1 ? attackMultiplier = 1 : attackMultiplier = attackMultiplier;
	return attackMultiplier;
}
function startGame(){
	var hitPoints;
	var playerOne;
	playerOne = {
		attack: "",
		defense: "",
		speed: "",
		initiative: "",
		modifier: "",
	}
	var playerTwo;
	playerTwo = {
		attack: "",
		defense: "",
		speed: "",
		initiative: "",
		modifier: "",
	}
	hitPoints = [3, 3];
	var playerOneAttack;
	var playerOneDefense;
	var playerOneSpeed;
	var playerOneSelector = "One";
	var playerTwoSelector = "Two";
	while (hitPoints[0] > 0 && hitPoints[1] > 0){
	playerOneAttack = selectPlayerDice(playerOneSelector, "attack");
	playerOneDefense = selectPlayerDice(playerOneSelector, "defense");
	playerOneSpeed = selectPlayerDice(playerOneSelector, "speed");
	var playerTwoAttack = selectPlayerDice(playerTwoSelector, "attack");
	var playerTwoDefense = selectPlayerDice(playerTwoSelector, "defense");
	var playerTwoSpeed = selectPlayerDice(playerTwoSelector, "speed");
	playerOneAttack = collectDiceResults(playerOneAttack);
	playerOneDefense = collectDiceResults(playerOneDefense);
	playerOneSpeed = collectDiceResults(playerOneSpeed);
	playerTwoAttack = collectDiceResults(playerTwoAttack);
	playerTwoDefense = collectDiceResults(playerTwoDefense);
	playerTwoSpeed = collectDiceResults(playerTwoSpeed);
	playerOne.attack = playerOneAttack;
	playerOne.defense = playerOneDefense;
	playerOne.speed = playerOneSpeed;
	playerTwo.attack = playerTwoAttack;
	playerTwo.defense = playerTwoDefense;
	playerTwo.speed = playerTwoSpeed;
	hitPoints = startCombat(playerOne, playerTwo, hitPoints);
	}
	if (hitPoints[0] === 0){
		console.log("Player one loses");
	}
	else{
		console.log("player two loses");
	}
}
function randomizeBackground(){
var availableImages = ["images/valley.jpg","images/river.jpg","images/finnTreeHouse.jpg"]
var body = document.getElementsByTagName('body')[0];
var imageSelector = Math.floor(Math.random()*3);
body.style.backgroundImage = "url('" +availableImages[imageSelector]+"')";
}
window.onload = randomizeBackground();