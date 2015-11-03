'use strict';
module.exports = function(grunt) {
    return {
        options: {
            files: 'test/test.js'
        },
        spec: {
            options: {
                reporter: 'spec',
                timeout: 10000
            }
        }
    };
};
