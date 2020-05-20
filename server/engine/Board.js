const Words = require("./Words");
const Card = require("./Card");
const MapCard = require("./MapCard");

class Board {
  constructor() {
    //new deck of words
    this.deck = [...Words];
    this.shuffle(this.deck);
    this.deckLength = this.deck.length;
    this.mapCard = new MapCard();
    //drawed cards
    this.cards = [];
  }

  generateNewRound() {
    let selectedWords = [];
    if (this.deckLength > 25) {
      selectedWords = this.deck.splice(0, 25);
      this.updateDeckLength();
    } else {
      this.deck = [...Words];
      this.shuffle(this.deck);
    }
    this.shuffle(this.mapCard);
    this.cards = selectedWords.map(
      (word, index) => new Card(word, this.mapCard.roles[index])
    );
  }

  updateDeckLength() {
    this.deckLength = this.deck.length;
  }

  getCards() {
    return this.cards;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

const newBoard = new Board();
newBoard.generateNewRound();
console.log(newBoard.deckLength);
console.log(newBoard.mapCard);
console.log(newBoard.cards);
