import Deck, { Card } from "./deck.js";
import { isRoundWinner, checkGameOver, playGame } from "./helpers";

test(`number of Cards`, () => {
  const deck = new Deck();
  expect(deck.numberOfCards).toBe(40);
});

test("shuffle function should randomize cards", () => {
  const deck = new Deck();
  expect(deck.shuffle()).toBe(undefined);
});

test("discard pile should be shuffled into draw pile", () => {
  const deck = new Deck([]);
  const discardPile = [1, 2, 3, 4];
  expect(checkGameOver(deck, discardPile).length).toBe(discardPile.length);
});

test("When comparing two cards, the higher card should win", () => {
  const card1 = new Card("♠", 4);
  const card2 = new Card("♣", 5);
  expect(isRoundWinner(card2, card1)).toBe(true);
});

test("When two cards are equal the winner of the next round should win 4 cards", () => {
  let player1Cards = [new Card("♠", 4), new Card("♠", 3)];
  let player2Cards = [new Card("♠", 4), new Card("♠", 5)];
  let player1Deck = new Deck(player1Cards);
  let player2Deck = new Deck(player2Cards);
  let gameDeck = [];
  let discardPileP1 = [];
  let discardPileP2 = [];
  let txt = "";
  while (player1Deck.numberOfCards != 0) {
    let card1 = player1Deck.pop();
    let card2 = player2Deck.pop();
    console.log("GameDeck.." + gameDeck.length);
    [txt, discardPileP1, discardPileP2, gameDeck] = playGame(
      card1,
      card2,
      discardPileP1,
      discardPileP2,
      gameDeck
    );
  }
  expect(discardPileP2.length).toBe(4);
});
