'use strict';
module.exports = function () {
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
