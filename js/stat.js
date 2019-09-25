'use strict';

window.renderStatistics = function (ctx, names, times) {
  var BAR_X = 130;
  var BAR_Y = 100;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var BAR_GAP = 50;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;

  drawStatsBackground(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  var timeWinner = getMaxNumber(times);
  var x = BAR_X;
  for (var i = 0; i < names.length; i++) {
    drawColumn(ctx, names[i], times[i], timeWinner, x, BAR_Y, BAR_WIDTH, BAR_HEIGHT, BAR_GAP);
    x = x + BAR_WIDTH + BAR_GAP;
  }
};

var drawStatsBackground = function (ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT) {
  drawCloud(ctx, CLOUD_X, CLOUD_Y, 10, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, CLOUD_X, CLOUD_Y, 0, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(255, 255, 255, 1)');
  drawText(ctx, 130, 40, 'Ура вы победили!', 'rgba(0, 0, 0, 1)');
  drawText(ctx, 130, 60, 'Список результатов:', 'rgba(0, 0, 0, 1)');
};

// Получение максимального элемента из масива
var getMaxNumber = function (times) {
  var maxTime = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i + 1] > maxTime) {
      maxTime = times[i + 1];
    }
  }
  maxTime = Math.round(maxTime);
  return maxTime;
};

// Нарисовать облако
var drawCloud = function (ctx, CLOUD_X, CLOUD_Y, cloudGap, CLOUD_WIDTH, CLOUD_HEIGHT, color) {
  ctx.fillStyle = color;
  var x = CLOUD_X + cloudGap;
  var y = CLOUD_Y + cloudGap;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// Нарисовать текст
var drawText = function (ctx, x, y, text, color) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

// Рисование колонки
var drawColumn = function (ctx, name, time, timeWinner, x, BAR_Y, BAR_WIDTH, BAR_HEIGHT) {
  var barOpacity = getRandomNumber(1, 10);
  time = Math.round(time);
  ctx.fillStyle = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgba(0, 0, 255,' + barOpacity + ')';
  var barCurrentHeight = time === timeWinner ? BAR_HEIGHT : barCurrentHeight = Math.round(time * BAR_HEIGHT / timeWinner);
  ctx.fillRect(x, BAR_Y + BAR_HEIGHT - barCurrentHeight, 40, barCurrentHeight);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText(time, x, 90 + BAR_HEIGHT - barCurrentHeight);
  ctx.fillText(name, x, 270);
};

// Получение случайного числа
var getRandomNumber = function (minNum, maxNum) {
  var randomNumber = Math.floor(Math.random() * maxNum + minNum) / 10;
  return randomNumber;
};
