'use strict';
module.exports = function () {
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
