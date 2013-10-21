'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['src/require.js']
            },
            preconcat: ['Gruntfile.js', 'src/**/*.js'],
            postconcat: ['dist/main.js']
        },
        requirejs: {
            compile: {
                options: {
                    wrap: {
                        start: '(function() {',
                        end: '}());'
                    },
                    name: 'main',
                    baseUrl: 'src',
                    include: ['require.js'],
                    optimize: 'none',
                    useStrict: true,
                    out: 'dist/build.js'
                }
            }
        },
        closure: {
            options: {
                closureJar: './compiler.jar',
                js: 'dist/build.js',
                jsOutputFile: 'dist/build.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['jshint:preconcat', 'requirejs', 'closure']);
};