const fs = require('fs');
const { setVisibility, updateGameData, updateGameStatus } = require('./updateDataLibrary.js');
const { readFile, writeFile, isRevealed } = require('./helpers.js');

const parse = JSON.parse;
const stringify = JSON.stringify;

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

const generateWebpage = function ({ board }, templateAsString) {
  const blocks = board.map(generateBlock).join('');
  return templateAsString.replace(/_BLOCKS_/, blocks);
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
