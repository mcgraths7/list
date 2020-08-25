#!/usr/bin/env node

const fs = require('fs');
const colors = require('colors');
const { lstat } = fs.promises;

const requestedPath = process.argv[2];

fs.readdir(requestedPath || process.cwd(), async (err, files) => {
  if (err) {
    throw new Error(err);
  }
  let statPromises = files.map((file) => {
    return lstat(file);
  });
  const allStats = await Promise.all(statPromises);
  for (let stats of allStats) {
    const idx = allStats.indexOf(stats);
    const filename = files[idx];
    if (filename[0] === '.') {
      console.log(filename.red);
    } else if (stats.isDirectory()) {
      console.log(filename.blue);
    } else {
      console.log(filename.green);
    }
  }
});
