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
            'assets/audio/jump.ogg',
            'assets/audio/jump.mp3',
            'assets/audio/jump.wav',
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
                    ],
                    jump: [
                        'assets/audio/jump.ogg',
                        'assets/audio/jump.mp3',
                        'assets/audio/jump.wav'
                    ]
                });

                Crafty.scene('Level');
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

    Crafty.scene('Level', function () {
        var level = Crafty.asset('levels').shift(),
            player,
            recall,
            states = [];

        if (level === undefined) {
            Crafty.scene('End');
        }

        Crafty.background('#FFFFFF');
        Crafty.e('2D, Canvas, TiledMapBuilder').setMapDataSource(level)
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
        player.onHit('Death', recall)
            .onHit('Enemy', function (objs) {
                var i, enemy;
                for (i = objs.length; i--;) {
                    enemy = objs[i];
                    if (enemy.normal.y !== 0) {
                        enemy.obj.destroy();
                        this._falling = false;
                        this.trigger('KeyDown', 'W');
                    }
                    else {
                        recall(objs);
                    }
                }
            });

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

    Crafty.scene('End', function () {
        var e = Crafty.e('2D, Canvas, Text')
            .attr({x: game.width / 2, y: game.height / 2, w: game.width})
            .text('You Win')
            .textColor('#000000', 1.0);
        Crafty.viewport.follow(e, 0, 0);
    });
})();
