(function () {
    'use strict';
    Crafty.c('Timer', {
        init: function () {
            return this;
        },
        start: function (duration) {
            if (this._begin === undefined) {
                this._duration = duration * 1000;
                this._begin = Date.now();
                this._to = setTimeout(this.stop, this._duration, this);
            }
            else {
                this._duration -= (this._pause_start - this._begin);
                this._to = setTimeout(this.stop, this._duration, this);
            }
            return this;
        },
        pause: function () {
            if (this._begin !== undefined) {
                clearTimeout(this._to);
                this._pause_start = Date.now();
            }
            return this;
        },
        stop: function (that) {
            Crafty.trigger('Alarm');
            return that.cancel();
        },
        cancel: function () {
            delete this._begin;
            return this;
        }
    });
})();
