'use strict';

/**
 * @type {Chai.ChaiStatic}
 */
let chai = require('chai');
/**
 * @type {IGrunt}
 */
let grunt = require('grunt');

let galvanize = require('../tasks/galvanize.js'),
    testArray = [],
    galvanizeConfig = [
        {options: {testColor: 'red'}},
        {options: [{key: 'testColor', value: 'blue'}]},
        {options: [{key: 'testColor', value: 'green'}]}
    ];
galvanize(grunt);

grunt.registerTask('addColor', () => {
    let color = grunt.option('testColor');
    testArray.push(color);
});

grunt.registerTask('testSetup', () => {
    grunt.option('galvanizeConfig', galvanizeConfig);
    grunt.task.run(['galvanize:addColor']);
});

// Decorate all objects and primitives with a `.should` method
chai.should();

describe('Galvanize', () => {
    before(() => {
        grunt.task.run(['testSetup']);
    });

    it('Should run `test` task with three different colors', () => {
        //assert that all three options were used
        testArray.length.should.equal(testArray.length);

        //assert that the order is correct
        testArray.forEach((options, index) => {
            let color = options[0].value;
            testArray[index].should.equal(color);
        });
    });
});
