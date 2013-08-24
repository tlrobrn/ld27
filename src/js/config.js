'use strict';
var game = {
    width: 640,
    height: 480,
    start: function () {
        Crafty.init(game.width, game.height);
        Crafty.scene('Loading');
    }
};

Date.now = (function () { return Date.now || +new Date() })();
