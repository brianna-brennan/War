//1. Define required constants:
//1.1 Define deck of cards with values that indicate what theyre worth
//1.2 Define two players, player 1 and 2 as objects each with total score and current card

//2. Upon loading the app should:
//Button and playing field should load
// Render a message:
//If statement: If player 1 choice is equal to player 2 choice display "tie" message, if player 1 choice
//is greater than player 2 choice or vice versa display which player wins

//3. Drawing cards:
//Use an event listener to randomly select a card when the player
//clicks "draw card" button
//use math.random to randomly select a card from the cards array
//loop through if statements to determine winner based on card values
//if returned true, declare winner

/*----- constants-----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = [
	'02',
	'03',
	'04',
	'05',
	'06',
	'07',
	'08',
	'09',
	'10',
	'J',
	'Q',
	'K',
	'A',
];
const cardLookUp = {
	J: 11,
	Q: 12,
	K: 13,
	A: 14,
};

const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/

let shuffledDeck, pDeck, cDeck, pHand, cHand, pPoints, cPoints;

/*----- cached element references-----*/

let message = document.getElementById('message');
let playerScoreEl = document.getElementById('player-score');
let computerScoreEl = document.getElementById('computer-score');
let button = document.getElementById('draw-card');
let winner = document.getElementById('winner');

/*----- event listeners -----*/
button.addEventListener('click', drawCard);

/*----- functions -----*/
init();

function init() {
	shuffledDeck = getNewShuffledDeck();
	pDeck = shuffledDeck.splice(0, 26); //takes 26 cards fromt the deck
	cDeck = shuffledDeck; //returns the rest of the deck
	pHand = [];
	cHand = [];
	pPoints = 0;
	cPoints = 0;
	render();
}

// draw random card
function drawCard() {
	let drawnComputer = cDeck.pop();
	cHand.push(drawnComputer);
	let drawnPlayer = pDeck.pop();
	pHand.push(drawnPlayer);
	console.log('c', drawnComputer);
	console.log('p', drawnPlayer);
	document.getElementById('computer').className = `card ${drawnComputer.face}`;
	document.getElementById('player').className = `card ${drawnPlayer.face}`;
	compareCard(drawnComputer.value, drawnPlayer.value);
}

function compareCard(x, y) {
	if (x === y) {
		message.innerHTML = 'Tie!';
	} else if (x > y) {
		cPoints++;
		computerScoreEl.innerHTML = cPoints;
		message.innerHTML = 'Computer Wins!';
		finalWinner();
	} else {
		pPoints++;
		playerScoreEl.innerHTML = pPoints;
		message.innerHTML = 'Player Wins!';
		finalWinner();
	}
}

function finalWinner() {
	if (pPoints === 10) {
		winner.innerHTML = 'Game Over! Player Wins!';
		console.log('Game Over! Player Wins!');
		document.getElementById('draw-card').disabled = true;
	}
	if (cPoints === 10) {
		winner.innerHTML = 'Game Over! Computer Wins!';
		console.log('Game Over! Computer Wins!');
		document.getElementById('draw-card').disabled = true;
	}
}

function render() {
	shuffledDeck;
}

function buildMasterDeck() {
	const deck = [];
	// Use nested forEach to generate card objects
	suits.forEach(function (suit) {
		ranks.forEach(function (rank) {
			deck.push({
				// The 'face' property maps to the library's CSS classes for cards
				face: `${suit}${rank}`,
				// Setting the 'value' property for game
				value: Number(rank) || cardLookUp[rank],
			});
		});
	});
	return deck;
}

function getNewShuffledDeck() {
	// Create a copy of the masterDeck
	const tempDeck = [...masterDeck];
	const newShuffledDeck = [];
	while (tempDeck.length) {
		// Get a random index for a card still in the tempDeck
		const rndIdx = Math.floor(Math.random() * tempDeck.length);
		// Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
		newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
	}
	console.log(newShuffledDeck);
	return newShuffledDeck;
}

function restart() {
	location.reload();
}
