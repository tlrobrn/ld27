'use strict';
var game = {
    width: 1280,
    height: 480,
    tile_width: 32,
    tile_height: 32,
    map_width: 40,
    map_height: 15,
    start: function () {
        Crafty.init(game.width, game.height);
        Crafty.viewport.init(game.width/4, game.height)
        Crafty.scene('Loading');
    }
};

Date.now = (function () { return Date.now || +new Date() })();
