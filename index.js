#!/usr/bin/env node

const fs = require('fs');
const colors = require('colors');

const requestedPath = process.argv[2];

fs.readdir(requestedPath || process.cwd(), { withFileTypes: true }, (err, files) => {
  if (err) {
    throw new Error(err);
  }
  files.map((file) => {
    fs.lstat(file.name, (err, stats) => {
      if (file.name[0] === '.') {
        console.log(file.name.red);
      } else if (stats.isDirectory()) {
        console.log(file.name.blue);
      } else if (stats.isFile()) {
        console.log(file.name.green);
      } else {
        console.log(file.name);
      }
    });
  });
});
