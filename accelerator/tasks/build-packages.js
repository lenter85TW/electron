module.exports = function(grunt) {
  'use strict'

  var packager = require('electron-packager');

  grunt.registerTask('buildPackages', 'Builds electron packages', function(buildOption) {
    var buildOptions, packageOptions, done, options;

    buildOptions = grunt.option('buildOptions');
    packageOptions = grunt.option('packageOptions');
    done = this.async();

    grunt.log.subhead('Building '+ buildOptions.applicationName +' for '+ buildOptions.platform +' platform(s)\n');

    options = {
      dir:  './',
      name: buildOptions.applicationName,
      platform: buildOptions.platform,
      arch: buildOptions.arch,
      out: buildOptions.buildsDirectory,
      icon: './images/logo.ico',
      ignore: buildOptions.ignorePackages,
      asar: true,
      'app-version': packageOptions.version,
      'version-string': {
          CompanyName: buildOptions.authors,
          ProductName: buildOptions.applicationName,
          LegalCopyright: 'Copyright (C) 2016 Twinny Ltd',
          FileDescription: buildOptions.applicationName,
          OriginalFilename: buildOptions.applicationName+'.exe',
          FileVersion: packageOptions.version,
          ProductVersion: packageOptions.version,
          InternalName: buildOptions.applicationName
        }
    };

    packager(options, done);

  });

  grunt.registerTask('build', [ 'clean', 'buildPackages']);
};
// win32metadata: {
//   CompanyName: buildOptions.authors,
//   FileDescription: 'FileDescription',
//   OriginalFilename: 'OriginalFilename',
//   ProductName: buildOptions.applicationName,
//   InternalName: buildOptions.applicationName
// }
