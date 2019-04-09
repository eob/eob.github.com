/*
 * grunt-html-trim
 * https://github.com/sparanoid/grunt-html-trim
 *
 * Copyright (c) 2017 Tunghsiao Liu
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  grunt.registerMultiTask('html_trim', 'Trim HTML files', function() {
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath).trim();
      });

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });

  });

};
