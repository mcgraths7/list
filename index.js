#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { lstat } = fs.promises;
require('colors');

const requestedPath = process.argv[2] || process.cwd();

fs.readdir(requestedPath, async (err, files) => {
  if (err) {
    throw new Error(err);
  }
  let statPromises = files.map((file) => {
    fullFile = path.join(requestedPath, file);
    // console.log(fullFile);
    return lstat(fullFile);
  });
  const allStats = await Promise.all(statPromises);
  for (let stats of allStats) {
    const idx = allStats.indexOf(stats);
    const filename = files[idx];
    if (filename[0] === '.') {
      console.log(filename.red);
    } else if (stats.isDirectory()) {
      console.log(filename.blue);
    } else if (stats.isFile()) {
      console.log(filename.green);
    } else {
      console.log(filename);
    }
  }
});
