const fs = require('fs');
const stringify = JSON.stringify;

const duplicate = arr => arr.concat(arr);

const writeToFile = (file, content) => fs.writeFileSync(file, content, 'utf8');

const shuffle = function (arr) {
  return arr;
};

const symbolObject = function (symbol, index) {
  return {
    position: index + 1,
    symbol: symbol,
    reveal: false
  };
};

const setBlocks = function (symbols, numOfBlocks) {
  const uniqSymbols = symbols.slice(0, numOfBlocks / 2);
  const shuffledSymbols = shuffle(duplicate(uniqSymbols));
  return shuffledSymbols.map(symbolObject);
};

const gameSetUp = function (playerName, numOfBlocks, symbols) {
  const data = {
    board: setBlocks(symbols, numOfBlocks),
    player: { name: playerName, score: 0, attempts: 0 },
    lastMove: null,
    isGameOver: false
  };
  writeToFile('./resources/data.json', stringify(data))
};

const symbols = [
  '&#9214', '&#9835',
  '&#9851', '&#9733',
  '&#9730', '&#9787',
  '&#9775', '&#9752'
];

gameSetUp(process.argv[2], 4, symbols);
