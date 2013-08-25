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
            this.requires('2D, Canvas, Collision');
        }
    });

    Crafty.c('Player', {
        init: function () {
            this.requires('Actor, Movement, Keyboard')
                .twoway(4, 8)
                .collision()
                .onHit('Platform', this._onHitPlatform)
                .onHit('Exit', function () {
                    Crafty.scene('Level');
                })
                .bind('KeyDown', function () {
                    if (this.isDown('W') || this.isDown('UP_ARROW')) {
                        Crafty.audio.play('jump', 0.5);
                    }
                });
        },

        _onHitPlatform: function (objs) {
            var platform;

            for (var i = objs.length; i--;) {
                platform = objs[i];
                if (platform.normal.y !== 0) {
                    this._up = false;
                    if (platform.normal.y < 0) {
                        this._falling = false;
                        this.y = platform.obj.y - this.h;
                    }
                }
                if (platform.normal.x !== 0) {
                    this._falling = true;
                    if (platform.normal.x === 1) {
                        this.x = platform.obj.x + platform.obj.w;
                    }
                    else {
                        this.x = platform.obj.x - this.w;
                    }
                }
            }
        }
    });

    Crafty.c('Platform', {
        init: function () {
            this.requires('Collision').collision();
        }
    });

    Crafty.c('Enemy', {
        init: function () {
            this._direction = Crafty.math.randomElementOfArray([true, false]) ? -1 : 1;
            this.requires('Actor, Gravity')
                .collision()
                .gravity('Platform')
                .onHit('Death', function () {
                    this.destroy();
                });
        }
    });

    Crafty.c('Red', {
        init: function () {
            var speed = 1;
            this.requires('Enemy')
                .onHit('Solid', function (objs) {
                    this._direction *= -1;
                })
                .bind('EnterFrame', function () {
                    this.x += speed * this._direction;
                });
        }
    });

    Crafty.c('Purple', {
        init: function () {
            var speed = 1;
            this.requires('Enemy')
                .onHit('Solid', function (objs) {
                    this._direction *= -1;
                })
                .bind('EnterFrame', function () {
                    this.y -= 2;
                    this.x += speed * this._direction;
                });
        }
    })
})();
