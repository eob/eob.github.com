/***************************************************
 * 6.S194 Debugging Exercise
 *
 * "The Juggler's Dilemma"
 *
 * To run:
 *   node jugglers-dilemma.js zipfile
 *
 * Creates a zipfile with some Creative Comons electronic music in it.
 *
 * Things to think about:
 *   * Mixing synchronous and asynchronous code.
 *
 * NOTE:
 *   This code relies on POSIX command line programs, so it will
 *   not run on Windows.
 *
 * WARNING:
 *   This will DELETE the directory name you pass in if it already
 *   exists.
 *
 ***************************************************/

var execFile = require('child_process').execFile;
var exec     = require('child_process').exec
var request  = require('request');
var fs       = require('fs');
var process  = require('process');
var path     = require('path');

var scrapeWebPage = function(url, directory) {
  var filename = url.replace(/\//g, "_"); // to not confuse teh filesystem
  var outputFile = path.join(directory, filename);
  request({uri:url}, function(err, response, body) {
    fs.writeFile(outputFile, body, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
};

var scrapeWebPagesIntoDirectory = function(urls, directory) {
  for (var i = 0; i < urls.length; i++) {
    scrapeWebPage(urls[i], directory);
  }
};

var zipDirectory = function(directory, intofile) {
  zipArgs = ['-r', '-j', intofile, directory];
  execFile('zip', zipArgs, function(err, stdout, stderr) {
    if (err) { console.log(err); } 
  });
};

var main = function(argv) {
  // NOTE:
  //   This arg parsing code is correct, but written for concision,
  //   and not robust to errors (e.g., missing arguments).
  var directory = "./JUGGLERS-DILEMMA-TEMP-DIR";
  var zipFilename = argv[2]; // argv[0] is 'node' and argv[1] is the .JS file
  var techno_urls = [
     "http://www.archive.org/download/x_a_free_techno_compilation/02._x_compilation_-_phvsr_-_metro_www.modularfield.net.mp3",
     "http://www.archive.org/download/x_a_free_techno_compilation/03._x_compilation_-_samim_and_michal_-_ripop_www.archive.orgdetailstextone.mp3",
  ];

  // Ensure temp directory exists and is empty
  if (fs.existsSync(directory)) {
    // Clear temp directory (and its contents)
    exec('rm ', path.join(directory, '*'));
  } else {
    fs.mkdirSync(directory);
  }

  // Delete file if exists
  if (fs.existsSync(zipFilename)) {
    fs.unlinkSync(zipFilename);
  }

  // Create directory

  // Scrape the web pages
  scrapeWebPagesIntoDirectory(techno_urls, directory);

  // Compress web page
  console.log("zip");
  zipDirectory(directory, zipFilename);

  // Clear temp directory (and its contents)
  console.log("removing dir");
  //exec('rm -rf ' + directory);
};

main(process.argv);
