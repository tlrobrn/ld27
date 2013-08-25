(function () {
    'use strict';
    Crafty.c('Movement', {
        init: function () {
            this.requires('Twoway, Gravity')
                .gravity();
        }
    });

    Crafty.c('Actor', {
        init: function () {
            this.requires('2D, Canvas, SpriteAnimation, Collision');
        }
    });

    Crafty.c('Player', {
        init: function () {
            var animation_speed = 4;
            this.requires('Actor, Movement, PlayerSprite')
                .twoway(4, 8)
                .animate('walk_left', 0, 0, 3)
                .animate('walk_right', 0, 1, 3)
                .collision()
                .onHit('Platform', this._onHitPlatform)
                .bind('NewDirection', function (data) {
                    if (data.x < 0) {
                        this.animate('walk_left', animation_speed, -1);
                    }
                    else if (data.x > 0) {
                        this.animate('walk_right', animation_speed, -1);
                    }
                    else {
                        this.stop();
                    }
                });
        },

        _onHitPlatform: function (objs) {
            var solid;

            for (var i = objs.length; i--;) {
                solid = objs[i];
                if (solid.normal.y !== 0) {
                    this._up = false;
                    if (solid.normal.y < 0) {
                        this._falling = false;
                        this.y = solid.obj.y - this.h;
                    }
                }
                if (solid.normal.x !== 0) {
                    this._falling = true;
                    if (solid.normal.x === 1) {
                        this.x = solid.obj.x + solid.obj.w;
                    }
                    else {
                        this.x = solid.obj.x - this.w;
                    }
                }
            }
        }
    });

    Crafty.c('Platform', {
        init: function () {
            this.requires('Collision').collision();
        }
    })
})();
