const conventionalChangelog = require('conventional-changelog');
const fs = require('fs');

conventionalChangelog({
  preset: 'angular'
}).pipe(fs.createWriteStream('CHANGELOG.md'));
