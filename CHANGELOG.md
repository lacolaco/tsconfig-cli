<a name="2.0.0"></a>
# [2.0.0](https://github.com/laco0416/tsconfig-cli/compare/v1.0.2...v2.0.0) (2016-04-08)


### Features

* **core:** add output option ([ec9abdb](https://github.com/laco0416/tsconfig-cli/commit/ec9abdb))


### BREAKING CHANGES

* core: S

When you use `-u` option, an input file will be overwritten ALWAYS.

 If you want to separate input and output files, use `-o` option.

 BEFORE:

 ```
 $ tsconfig -u tsconfig.proto.json
 ```

 AFTER

 ```
 $ tsconfig -o tsconfig.json tsconfig.proto.json
 ```



<a name="1.0.2"></a>
## [1.0.2](https://github.com/laco0416/tsconfig-cli/compare/v1.0.1...v1.0.2) (2016-03-06)




<a name="1.0.1"></a>
## [1.0.1](https://github.com/laco0416/tsconfig-cli/compare/v1.0.0...v1.0.1) (2016-03-06)




<a name="1.0.0"></a>
# [1.0.0](https://github.com/laco0416/tsconfig-cli/compare/v1.0.0-pre...v1.0.0) (2016-03-06)


### Bug Fixes

* **scripts:** fix changelog.js ([d1372fa](https://github.com/laco0416/tsconfig-cli/commit/d1372fa))
* **scripts:** fix npm scripts ([b8e0c0a](https://github.com/laco0416/tsconfig-cli/commit/b8e0c0a))

### Features

* **core:** Add -v option and more logging ([6c97b0b](https://github.com/laco0416/tsconfig-cli/commit/6c97b0b))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/laco0416/tsconfig-cli/compare/v0.1.0...v0.1.1) (2015-11-21)




<a name="0.1.0"></a>
# [0.1.0](https://github.com/laco0416/tsconfig-cli/compare/v0.0.2...v0.1.0) (2015-11-21)




<a name="0.0.2"></a>
## 0.0.2 (2015-11-12)




