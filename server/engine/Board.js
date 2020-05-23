const Words = require("./Words");
const Card = require("./Card");
const getMapCard = require("./getMapCard");
const shuffle = require("./shuffle");

class Board {
  constructor() {
    //new deck of words
    this.deck = [...Words];
    shuffle(this.deck);
    this.deckLength = this.deck.length;
    this.mapCard = [];
    //drawed cards
    this.cards = [];

    this.redAgentNum = 0;
    this.blueAgentNum = 0;

    this.decideAgentNum();
    this.generateNewRound();
  }

  generateNewRound() {
    let selectedWords = [];
    const remainCardsNum = 25;

    if (this.deckLength < remainCardsNum) {
      this.deck = [...Words];
      shuffle(this.deck);
    }
    selectedWords = this.deck.splice(0, 25);
    this.updateDeckLength();

    this.cards = selectedWords.map(
      (word, index) => new Card(word, this.mapCard[index])
    );
  }

  updateDeckLength() {
    this.deckLength = this.deck.length;
  }

  //getters
  getCards() {
    return this.cards;
  }
  getRedAgentNum() {
    return this.redAgentNum;
  }
  getBlueAgentNum() {
    return this.blueAgentNum;
  }

  setCard(selectedCard) {
    //assume it pass the card
    this.cards.forEach(card => {
      if (card === selectedCard) {
        card.select();
        return card.role;
      }
    })
  }

  decideAgentNum() {
    const decision = Math.round(Math.random());
    if (decision === 0) {
      this.blueAgentNum = 9;
      this.redAgentNum = 8;
    } else {
      this.blueAgentNum = 8;
      this.redAgentNum = 9;
    }
    this.mapCard = getMapCard(decision);
  }
}

module.exports = Board;
// const newBoard = new Board();
// console.log(newBoard.deckLength, "deck");
// console.log(newBoard.mapCard);
// console.log(newBoard.cards);
// console.log(newBoard.redAgentNum);
// console.log(newBoard.blueAgentNum);
// newBoard.generateNewRound();
// console.log(newBoard.deckLength, "deck");
// console.log(newBoard.mapCard);
// console.log(newBoard.cards);
// console.log(newBoard.redAgentNum);
// console.log(newBoard.blueAgentNum);