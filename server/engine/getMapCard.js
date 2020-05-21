const WordRoles = require("./WordRoles");
const shuffle = require("./shuffle");

const blueAgents0 = new Array(9).fill(WordRoles.BLUE);
const redAgents0 = new Array(8).fill(WordRoles.RED);
const blueAgents1 = new Array(8).fill(WordRoles.BLUE);
const redAgents1 = new Array(9).fill(WordRoles.RED);
const innocentBystanders = new Array(7).fill(WordRoles.WHITE);
const assassins = new Array(WordRoles.BLACK);
const deck0 = new Array().concat(
  blueAgents0,
  redAgents0,
  innocentBystanders,
  assassins
);
const deck1 = new Array().concat(
  blueAgents1,
  redAgents1,
  innocentBystanders,
  assassins
);

const getMapCard = (binaryNum) => {
  if (binaryNum === 0) {
    return shuffle(deck0);
  } else {
    return shuffle(deck1);
  }
};

module.exports = getMapCard;
