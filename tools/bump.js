const exec = require('child_process').exec;
const cl = require('./changelog');

exec(`npm version --git-tag-version=false ${process.argv.slice(2).join(' ')}`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  process.env.npm_new_version = stdout;
  exec(`git add -u && git commit -m "chore(release): Update to ${stdout}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    console.log(stderr);

    cl(()=> {
      exec(`git add -u && git commit -m "docs(changelog): Update CHANGELOG.md" && git tag "${process.env.npm_new_version.trim()}"`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
        console.log(stderr);
      });
    })
  });
});
