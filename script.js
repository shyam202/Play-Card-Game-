import Deck from "./deck.js";
import { isGameOver, playGame } from "./helpers.js";
const player1CardSlot = document.querySelector(".player1-card-slot");
const player2CardSlot = document.querySelector(".player2-card-slot");
const player1DeckElement = document.querySelector(".player1-deck");
const player2DeckElement = document.querySelector(".player2-deck");
const discardPileP1Element = document.querySelector(".player1-discard-pile");
const discardPileP2Element = document.querySelector(".player2-discard-pile");
const text = document.querySelector(".text");
document.querySelector(".restart-btn").addEventListener("click", function () {
  window.location.reload();
  return false;
});

let player1Deck,
  player2Deck,
  inRound,
  discardPileP1 = [],
  discardPileP2 = [],
  gameDeck = [];

document.addEventListener("click", () => {
  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  player1Deck = new Deck(deck.cards.slice(0, deckMidpoint));
  player2Deck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  cleanBeforeRound();
}

function cleanBeforeRound() {
  inRound = false;
  player2CardSlot.innerHTML = "";
  player1CardSlot.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function flipCards() {
  inRound = true;
  const player1Card = player1Deck.pop();
  const player2Card = player2Deck.pop();
  player1CardSlot.appendChild(player1Card.getHTML());
  player2CardSlot.appendChild(player2Card.getHTML());

  updateDeckCount();

  [text.innerText, discardPileP1, discardPileP2, gameDeck] = playGame(
    player1Card,
    player2Card,
    discardPileP1,
    discardPileP2,
    gameDeck
  );

  if (isGameOver(player1Deck)) {
    if (discardPileP1.length == 0) {
      text.innerText = "Player 2 Wins the match!!";
    } else {
      player1Deck = new Deck([...discardPileP1]);
      player1Deck.shuffle();
      discardPileP1 = [];
    }
  }

  if (isGameOver(player2Deck)) {
    if (discardPileP2.length == 0) {
      text.innerText = "Player 1 Wins the match!!";
    } else {
      player2Deck = new Deck([...discardPileP2]);
      player2Deck.shuffle();
      discardPileP2 = [];
    }
  }
}

function updateDeckCount() {
  player2DeckElement.innerText = player2Deck.numberOfCards;
  player1DeckElement.innerText = player1Deck.numberOfCards;
  discardPileP1Element.innerText = discardPileP1.length;
  discardPileP2Element.innerText = discardPileP2.length;
}
