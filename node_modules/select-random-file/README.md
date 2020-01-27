select-random-file
==================

[![Build Status](https://travis-ci.org/jfix/npm-random-file.svg?branch=master)](https://travis-ci.org/jfix/npm-random-file)

Select a random file from a provided directory:

```
const randomFile = require('random-file')

const dir = '/tmp/whatever'
randomFile(dir, (err, file) => {
  console.log(`The random file is: ${file}.`)
})
```

There are a couple of things that could be added:

* filter files by an extension
* recursively traverse a deeper directory structure

Acknowledgements
----------------

Discussion on Stack Overflow was very useful: http://stackoverflow.com/questions/42425887/how-to-use-an-async-function-as-compare-function-of-array-filter
