const fs = require('fs');
const { isSymbolMatching, isRevealed, getBlock } = require('./helpers.js');

const setVisibility = function (data, position, visibility) {
  const chosenBlock = getBlock(data.board, position);
  chosenBlock.reveal = visibility;
  return data;
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

exports.updateGameData = updateGameData;
exports.updateGameStatus = updateGameStatus;
exports.setVisibility = setVisibility;
