class Card {
  constructor(word, role) {
    this.word = word;
    this.role = role;
    this.selected = false;
  }

  select() {
    if (this.selected) {
        return false;
    } else {
        this.selected = true;
    }
  }
}

module.exports = Card;
