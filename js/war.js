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

// Initialize necessary elements
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

// Draw random card
function drawCard() {
	let drawnComputer = cDeck.pop();
	cHand.push(drawnComputer);
	let drawnPlayer = pDeck.pop();
	pHand.push(drawnPlayer);
	// The 'face' property maps to the library's CSS classes for cards
	document.getElementById('computer').className = `card ${drawnComputer.face}`;
	document.getElementById('player').className = `card ${drawnPlayer.face}`;
	// Call function to compare the two cards drawn
	compareCard(drawnComputer.value, drawnPlayer.value);
}

// Function to compare both cards
function compareCard(x, y) {
	if (x === y) {
		message.innerHTML = 'Tie! Nobody gets a point!';
	} else if (x > y) {
		//Add a point to the player score and display on screen
		cPoints++;
		computerScoreEl.innerHTML = cPoints;
		message.innerHTML = 'Computer gets a point!';
		finalWinner();
	} else {
		//Add a point to the player score and display on screen
		pPoints++;
		playerScoreEl.innerHTML = pPoints;
		message.innerHTML = 'Player gets a point!';
		finalWinner();
	}
}

// Winning comdition function
function finalWinner() {
	if (pPoints === 10) {
		//Message displayed if condition is met
		winner.innerHTML = 'Game Over! Player Wins!';
		//Button disabled if comdition is met
		document.getElementById('draw-card').disabled = true;
	}
	if (cPoints === 10) {
		winner.innerHTML = 'Game Over! Computer Wins!';
		document.getElementById('draw-card').disabled = true;
	}
}

//Call the shuffled deck
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

//Reload the page
function restart() {
	location.reload();
}
