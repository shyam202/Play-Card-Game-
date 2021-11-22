export const CARD_VALUE_MAP = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
  };
export function isRoundWinner(cardOne, cardTwo) {
    if (CARD_VALUE_MAP[cardOne.value] == CARD_VALUE_MAP[cardTwo.value]) {
      return "equal";
    }
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

export function isGameOver(deck) {
    return deck.numberOfCards === 0;
}

export function checkGameOver(playerDeck, discardPile){
    if(isGameOver(playerDeck)) {
      return [...discardPile]
    }
}

export function playGame(player1Card, player2Card, discardPileP1, discardPileP2, gameDeck) {
  let txt = '';
  let discardPileP1Copy = [...discardPileP1];
  let discardPileP2Copy = [...discardPileP2];
  let gameDeckCopy = [...gameDeck];
  gameDeckCopy.push(player1Card);
  gameDeckCopy.push(player2Card);
  if (isRoundWinner(player1Card, player2Card) === "equal") {
    txt = `Draw`;
  } else if (isRoundWinner(player1Card, player2Card)) {
    txt = `Player 1 🔼 winner`;
    discardPileP1Copy = [...discardPileP1Copy, ...gameDeckCopy];
    gameDeckCopy = [];
  } else   {
    txt = `Player 2 🔽 winner`;
    discardPileP2Copy = [...discardPileP2Copy, ...gameDeckCopy];
    gameDeckCopy = [];
  }
  return[txt, discardPileP1Copy, discardPileP2Copy, gameDeckCopy];
}





