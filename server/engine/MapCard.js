const WordRoles = require("./WordRoles");

const blueAgents = new Array(9).fill(WordRoles.BLUE);
const redAgents = new Array(8).fill(WordRoles.RED);
const innocentBystanders = new Array(7).fill(WordRoles.WHITE);
const assassins = new Array(WordRoles.BLACK);

class MapCard {
  constructor() {
    this.roles = new Array().concat(
      blueAgents,
      redAgents,
      innocentBystanders,
      assassins
    );
  }
}

module.exports = MapCard;
