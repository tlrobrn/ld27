'use strict';
module.exports = function (grunt) {
    var game_title = 'SETUP',
        src_js = [
            'src/js/config.js'
        ],
        src_sass = 'src/sass/main.scss',
        src_jade = [
            'src/jade/index.jade'
        ],
        combined_js = 'tmp/combined.js',
        crafty_js = 'js/crafty.js',
        prod_js = 'js/src.min.js',
        prod_css = 'css/src.css';

    //noinspection JSUnresolvedFunction
    grunt.initConfig({
        concat: {
            dist: {
                src: src_js,
                dest: combined_js
            }
        },
        uglify: {
            dist: {
                src: combined_js,
                dest: prod_js
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/src.css': src_sass
                }
            }
        },
        jade: {
            dist: {
                options: {
                    data: {
                        title: game_title,
                        css: [prod_css],
                        js: [crafty_js, prod_js]
                    }
                },
                files: {
                    'index.html': [src_jade]
                }
            },
            debug: {
                options: {
                    pretty: true,
                    data: {
                        title: game_title,
                        css: [prod_css],
                        js: [crafty_js].concat(src_js)
                    }
                },
                files: {
                    'index.html': [src_jade]
                }
            }
        },
        clean: ['tmp']
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-git');

    grunt.registerTask('default', ['sass', 'jade:debug']);
    grunt.registerTask('make', ['concat', 'uglify', 'sass', 'jade:dist', 'clean']);
};
