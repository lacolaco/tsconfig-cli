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

## Important: JSON With Comments
tsconfig-cli allows comments (this is a feature planned in typescript 1.8), but updated json has no comments.
tsconfig-cli updates **always** `tsconfig.json`. So If you want to use json comments, you should rename the file. 

### Sample

misc/tsconfig.commented.json

```json
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
  /* GENERATED: DON'T EDIT*/
  "files": [
  ]
}
```

update json

```
tsconfig misc/tsconfig.commented.json -u # this update misc/tsconfig.json
```

output: misc/tsconfig.json
without comments.

```json
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
    "src/bar.ts",
    "src/foo.ts"
  ]
}
```

