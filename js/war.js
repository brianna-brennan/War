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
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const cardLookUp = {
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

let playerOne = {
    score: 0,
    currentCard: null,
}

let playerTwo = {
    score: 0,
    currentCard: null,
}

const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/

let shuffledDeck, scores, winner, finalResults;


/*----- cached element references-----*/

/*----- event listeners -----*/
document.getElementById("draw-card").addEventListener("click", drawCard);
 

/*----- functions -----*/
init();

function init() {
  shuffledDeck = getNewShuffledDeck();
  scores = 0;
  winner = null;
  finalResults = null;
  render();
}

function render(){
shuffledDeck
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game 
        value: Number(rank) || cardLookUp[rank]
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

  // draw random card 
  function drawCard(){
    let drawn = shuffledDeck.shift();
    console.log(drawn);
    return drawn;
};

drawCard(shuffledDeck);




