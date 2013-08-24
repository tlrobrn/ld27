(function () {
    'use strict';

    Crafty.scene('Loading', function () {
        var progress = Crafty.e('2D, Canvas, Text')
            .attr({x: game.width/2, y: game.height/2, w: game.width})
            .text('Loading 0% ...')
            .textColor('#FFFFFF', 1.0);

        Crafty.audio.canPlay();
        Crafty.load([
            'assets/audio/shift.ogg',
            'assets/audio/shift.mp3',
            'assets/audio/shift.wav'
        ],
        // Success
        function () {
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
        Crafty.background('#FF00FF');
    });

})();
