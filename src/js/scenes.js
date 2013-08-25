(function () {
    'use strict';

    Crafty.scene('Loading', function () {
        var progress = Crafty.e('2D, Canvas, Text')
            .attr({x: game.width / 2, y: game.height / 2, w: game.width})
            .text('Loading 0% ...')
            .textColor('#FFFFFF', 1.0);

        Crafty.audio.canPlay();
        Crafty.load([
            // Audio
            'assets/audio/shift.ogg',
            'assets/audio/shift.mp3',
            'assets/audio/shift.wav',
            // Images
            'assets/images/Sprites.png',
        ],
            // Success
            function () {
                Crafty.audio.add({
                    shift: [
                        'assets/audio/shift.ogg',
                        'assets/audio/shift.mp3',
                        'assets/audio/shift.wav'
                    ]
                });

                Crafty.sprite(32, 'assets/images/Sprites.png', {
                    PlayerSprite: [0, 0],
                    RedSprite: [1, 0],
                    PurpleSprite: [2, 0]
                });

                Crafty.scene('Title');
            },
            // Progress
            function (e) {
                progress.text('Loading ' + e.percent + '% ...');
            },
            // Error
            function (e) {
                console.log(e);
            });
    });

    Crafty.scene('Title', function () {
        var player,
            recall,
            states = [];

        Crafty.background('#FFFFFF');
        Crafty.e('2D, Canvas, TiledMapBuilder').setMapDataSource(Crafty.asset('levels')[0])
            .createWorld(function (map) {
                var solids = map.getEntitiesInLayer('Solid');
                for (var i = solids.length; i--;) {
                    solids[i].addComponent('Platform');
                }
            });

        recall = function (objs) {
            var pre = states.length - 11;
            if (pre >= 0) {
                states.length = pre + 1;
                player.y = states[pre]._y;
                player.x = states[pre]._x;
            }
            else {
                Crafty.scene('Lose');
            }
        };

        player = Crafty('Player');
        player.onHit('Enemy', recall).onHit('Death', recall);

        Crafty.viewport.follow(player, -game.tile_width, 0);
        states.push(player.pos());
        setInterval(function () {
            states.push(player.pos());
        }, 1000);
    });

    Crafty.scene('Lose', function () {
        var e = Crafty.e('2D, Canvas, Text')
            .attr({x: game.width / 2, y: game.height / 2, w: game.width})
            .text('You Lose')
            .textColor('#000000', 1.0);
        Crafty.viewport.follow(e, 0, 0);
    });
})();
