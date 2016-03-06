const conventionalChangelog = require('conventional-changelog');

conventionalChangelog({
  preset: 'angular'
}).pipe(process.stdout);
