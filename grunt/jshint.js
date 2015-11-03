'use strict';
module.exports = function(grunt) {
    return {
        all: [
            'test/**.js',
            'grunt/**.js',
            '*.js',
            'lib/**.js'
        ],
        options: {
            jshintrc: '.jshintrc',
        }
    };
};
