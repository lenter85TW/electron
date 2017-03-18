module.exports = function(grunt) {
  'use strict';

  var buildOptions = require('../config.json');
  var packageOptions = require('../package.json');

  grunt.option('buildOptions', buildOptions);
  grunt.option('packageOptions', packageOptions);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-extend-config");

  grunt.initConfig({
    clean: {
      builds: [buildOptions.buildsDirectory]
    }
  });

  grunt.loadTasks('./accelerator/tasks');

  grunt.registerTask('default', ['build']);
};
