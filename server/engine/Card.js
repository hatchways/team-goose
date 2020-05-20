class Card {
  constructor(word, role) {
    this.word = word;
    this.role = role;
    this.selected = false;
  }

  select() {
    this.selected = true;
  }
}

module.exports = Card;
