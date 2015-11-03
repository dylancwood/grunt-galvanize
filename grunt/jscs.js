'use strict';
module.exports = function(grunt) {
    return {
        all: {
            options: {
                config: '.jscsrc'
            },
            files: {
                src: [
                    'test/**.js',
                    'grunt/**.js',
                    '*.js',
                    'lib/**.js'
                ],
            }
        }
    };
};
