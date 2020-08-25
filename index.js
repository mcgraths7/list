#!/usr/bin/env node
// #!/Users/stevenmcgrath/.nvm/versions/node/v12.18.3/bin/node

const fs = require('fs');

fs.readdir(process.cwd(), (err, files) => {
  files.map((file) => {
    console.log(file);
  });
});
