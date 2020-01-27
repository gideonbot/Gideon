const fs = require('fs')
const rimraf = require('rimraf')
const async = require('async')
const assert = require('chai').assert
const path = require('path')

const randomFile = require('./index.js')

const baseDir = '/tmp/test-dir'

// TODO: clean up this callback hell

describe('randomFile', function () {
  it('should throw an error if directory does not exist', function (done) {
    const testDir = path.join(baseDir, 'i-dont-exist')
    assert.throws(
      () => {
        randomFile(testDir, done)
        done()
      },
      /ENOENT: no such file or directory/,
      'The directory does not exist'
    )
  })

  it('should return undefined if no files in directory', function (done) {
    fs.mkdtemp(baseDir, (err, d) => {
      if (err) done(err)
      randomFile(d, (err, file) => {
        if (err) return done(err)
        assert.equal(undefined, file)
        rimraf(d, () => done())
      })
    })
  })

  it('should return one file', function (done) {
    const fn = 'file-a'
    fs.mkdtemp(baseDir, (err, d) => {
      if (err) return done(err)

      fs.writeFile(path.join(d, fn), (err, f) => {
        if (err) return done(err)

        randomFile(d, (err, file) => {
          if (err) return done(err)

          assert.equal(fn, file)
          rimraf(d, () => done())
        })
      })
    })
  })

  it('should return one of several files', function (done) {
    const files = ['file-a', 'file-b', 'file-c', 'file-d']
    fs.mkdtemp(baseDir, (err, d) => {
      if (err) return done(err)

      async.each(files, function (file, done) {
        fs.writeFile(path.join(d, file), (err, f) => {
          if (err) return done(err)
        })
      })

      randomFile(d, (err, file) => {
        if (err) return done(err)
        assert.include(files, file)
        rimraf(d, () => done())
      })
    })
  })
})
