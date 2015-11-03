'use strict';

var chai = require('chai');
var grunt = require('grunt');
var galvanize = require('../tasks/galvanize.js');
var testArray = [];
var galvanizeConfig = [
    { options: {testColor: 'red'} },
    { options: [{key: 'testColor', value: 'blue'}] },
    { options: [{key: 'testColor', value: 'green'}] }
];
galvanize(grunt);

grunt.registerTask('addColor', function() {
    var color = grunt.option('testColor');
    testArray.push(color);
});

grunt.registerTask('testSetup', function() {
    grunt.option('galvanizeConfig', galvanizeConfig);
    grunt.task.run(['galvanize:addColor']);

});

// Decorate all objects and primitives with a `.should` method
chai.should();

describe('Galvanize', function() {
    it('Should run `test` task with three different colors', function() {
        grunt.tasks(['testSetup']);

        //assert that all three options were used
        testArray.length.should.equal(optionsList.length);

        //assert that the order is correct
        optionsList.forEach(function(options, index) {
            var color = options[0].value;
            testArray[index].should.equal(color);
        });
    });
});
