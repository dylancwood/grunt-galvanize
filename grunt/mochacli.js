'use strict';
module.exports = function () {
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
