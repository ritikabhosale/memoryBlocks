const fs = require('fs');
const { get } = require('http');

const readFile = file => fs.readFileSync(file, 'utf8');

const writeFile = (file, content) => fs.writeFileSync(file, content, 'utf8');

const isChosenPosition = (position, block) => block.position === position;

const isRevealed = block => block.reveal === true;

const getBlock = function (board, position) {
  return board.find(isChosenPosition.bind(null, position));
};

const isSymbolMatching = function (position1, position2, board) {
  const lastPick = getBlock(board, position1);
  const currentPick = getBlock(board, position2);
  return lastPick.symbol === currentPick.symbol;
};

exports.readFile = readFile;
exports.writeFile = writeFile;
exports.isRevealed = isRevealed;
exports.isSymbolMatching = isSymbolMatching;
exports.getBlock = getBlock;
