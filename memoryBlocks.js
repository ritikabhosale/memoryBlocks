const fs = require('fs');
const parse = JSON.parse;
const stringify = JSON.stringify;

const readFile = file => fs.readFileSync(file, 'utf8');

const writeFile = (file, content) => fs.writeFileSync(file, content, 'utf8');

const isChosenPosition = (position, block) => block.position === position;

const isRevealed = block => block.reveal === true;

const getBlock = (board, position) => board.find(isChosenPosition.bind(null, position));

const generateTag = function (tag, content, property) {
  let style = '';
  if (property) {
    style = ' class="' + property + '"';
  }
  return '<' + tag + style + '>' + content + '</' + tag + '>';
};

const generateBlock = function (block) {
  let symbol = '';

  if (isRevealed(block)) {
    symbol = block.symbol;
  }
  return generateTag('div', symbol, 'block');
};

const setVisibility = function (data, position, visibility) {
  const chosenBlock = getBlock(data.board, position);
  chosenBlock.reveal = visibility;
  return data;
};

const generateWebpage = function ({ board }, templateAsString) {
  const blocks = board.map(generateBlock).join('');
  return templateAsString.replace(/_BLOCKS_/, blocks);
};

const isSymbolMatching = function (position1, position2, board) {
  const lastPick = getBlock(board, position1);
  const currentPick = getBlock(board, position2);
  return lastPick.symbol === currentPick.symbol;
};

const incrementScores = function (data, incrementBy) {
  data.player.score += incrementBy;
  return data;
};

const hideBlocks = function (data, position1, position2) {
  data = setVisibility(data, position1, false);
  data = setVisibility(data, position2, false);
  return data;
};

const updateLastMove = function (data, position) {
  data.lastMove = position;
  return data
};

const updateGameStatus = function (data) {
  if (data.board.every(isRevealed)) {
    data.isGameOver = true;
  }
  return data;
};

const updateGameData = function (data, position) {
  const board = data.board;
  const lastMove = data.lastMove;

  if (!lastMove) {
    return updateLastMove(data, position);
  }

  data.lastMove = null;
  if (isSymbolMatching(lastMove, position, board)) {
    return incrementScores(data, 5);
  }
  return hideBlocks(data, lastMove, position);
};

const main = function (position, dataFile, template) {
  let data = parse(readFile(dataFile));
  const templateAsString = readFile(template);

  data = setVisibility(data, position, true);
  const webpage = generateWebpage(data, templateAsString);
  writeFile('./index.html', webpage);

  data = updateGameData(data, position);
  data = updateGameStatus(data);
  writeFile('./resources/data.json', stringify(data));
};

main(+process.argv[2], './resources/data.json', './resources/template.html');
