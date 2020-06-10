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
  getACard(index) {
    return this.getCards()[index];
  }
  getRedAgentNum() {
    return this.redAgentNum;
  }
  getBlueAgentNum() {
    return this.blueAgentNum;
  }
  getVotedCards() {
    console.log("in get")
    this.getCards().filter(card => {
      console.log(card);
       return !card.getStatus() && card.getNumVotes() > 0
    });
    // return this.getCards().filter(card => !card.getStatus() && card.getNumVotes() > 0);
  }

  setCard(index) {
    this.getACard(index).select();
  }
  voteOnCard(index, user) {
    const votedCard = this.getACard(index);
    votedCard.addVote(user);
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
