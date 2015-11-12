# tsconfig-cli

[![Build Status](https://travis-ci.org/laco0416/tsconfig-cli.svg)](https://travis-ci.org/laco0416/tsconfig-cli)

A CLI of [https://github.com/TypeStrong/tsconfig](https://github.com/TypeStrong/tsconfig)

## Install

```
npm i --save-dev tsconfig-cli
```

## Usage

```
# update tsconfig.json (overwrite)
> tsconfig -u

# Output to stdout
> tsconfig src/tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "noImplicitAny": true,
    "removeComments": true,
    "outDir": "dist"
  },
  "filesGlob": [
    "src/**/*.ts",
    "!ignored/**/*.ts"
  ],
  "files": [
    "src/foo.ts"
  ]
}
```
