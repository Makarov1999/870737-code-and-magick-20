'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var HEADING_GAP_X = 20;
  var CHART_SPACE_BOTTOM = 20;
  var CHART_SPACE_LEFT = 40;
  var HEADING_GAP_Y = 32;
  var HEADING_LINE_HEIGHT = 16;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var BAR_TEXT_SPACE = 10;
  var barHeight = CLOUD_HEIGHT - HEADING_GAP_Y - HEADING_LINE_HEIGHT * 4 - BAR_TEXT_SPACE * 2;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var getBarColor = function (player) {
    if (player === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    }
    return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 63%)';
  };

  var getBar = function (ctx, i, time, player, maxTime, barColor) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(time), CLOUD_X + CHART_SPACE_LEFT + BAR_WIDTH * i + BAR_GAP * i, CLOUD_HEIGHT - Math.round(((barHeight * time) / maxTime)));
    ctx.fillStyle = barColor;
    ctx.fillRect(CLOUD_X + CHART_SPACE_LEFT + BAR_WIDTH * i + BAR_GAP * i, CLOUD_HEIGHT - Math.round(((barHeight * time) / maxTime)) + BAR_TEXT_SPACE, 40, barHeight * time / maxTime - HEADING_LINE_HEIGHT - CHART_SPACE_BOTTOM - BAR_TEXT_SPACE);
    ctx.fillStyle = '#000';
    ctx.fillText(player, CLOUD_X + CHART_SPACE_LEFT + BAR_WIDTH * i + BAR_GAP * i, (CLOUD_HEIGHT - Math.round(((barHeight * time) / maxTime)) + BAR_TEXT_SPACE) + barHeight * time / maxTime - HEADING_LINE_HEIGHT - CHART_SPACE_BOTTOM + BAR_TEXT_SPACE);
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + HEADING_GAP_X, CLOUD_Y + HEADING_GAP_Y);
    ctx.fillText('Список результатов:', CLOUD_X + HEADING_GAP_X, CLOUD_Y + HEADING_GAP_Y + HEADING_LINE_HEIGHT);

    var maxTime = getMaxElement(times);
    for (var i = 0; i < players.length; i++) {
      var barColor = getBarColor(players[i]);
      getBar(ctx, i, times[i], players[i], maxTime, barColor);
    }
  };
})();
