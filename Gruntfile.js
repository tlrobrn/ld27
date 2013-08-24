'use strict';
module.exports = function (grunt) {
    var game_title = 'shift',
        src_js = [
            'src/js/crafty.js',
            'src/js/config.js',
            'src/js/components.js',
            'src/js/scenes.js'
        ],
        src_sass = 'src/sass/main.scss',
        src_jade = [
            'src/jade/index.jade'
        ],
        combined_js = 'tmp/combined.js',
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
                        js: [prod_js]
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
                        js: src_js
                    }
                },
                files: {
                    'index.html': [src_jade]
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'src/audio/', src: ['**'], dest: 'assets/audio'},
                    {expand: true, cwd: 'src/images/', src: ['**'], dest: 'assets/images'}
                ]
            }
        },
        clean: ['tmp']
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['sass', 'jade:debug', 'copy']);
    grunt.registerTask('make', ['concat', 'uglify', 'sass', 'jade:dist', 'copy', 'clean']);
};
