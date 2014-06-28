/**
 * rte <https://github.com/jonschlinkert/rte>
 *
 * Copyright (c) 2014, Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT License
 *
 */

var expect = require('chai').expect;
var ext = require('ext-ext');

describe('utils.ext()', function() {
  describe('when a filename with an extension is passed and options.ext is defined:', function() {
    var filepath = 'foo/bar/baz.min.js';

    it('should return the extension from options.ext', function() {
      var actual = ext(filepath, {ext: '.foo'});
      expect(actual).to.eql('.foo');
    });

    it('should return the extension from options.ext', function() {
      var actual = ext(filepath, {ext: '.foo', extDot: 'first'});
      expect(actual).to.eql('.foo');
    });

    it('should return the extension from options.ext', function() {
      var actual = ext(filepath, {ext: '.bar', extDot: 'last'});
      expect(actual).to.eql('.bar');
    });

    it('should return the extension from options.ext', function() {
      var actual = ext(filepath, {ext: 'none'});
      expect(actual).to.eql('');
    });

    it('should return the extension from options.ext', function() {
      var actual = ext(filepath, {ext: false});
      expect(actual).to.eql('');
    });

    describe('and ext is defined in the options:', function() {
      it('should return the defined ext', function() {
        var actual = ext(filepath, {ext: '.fez'});
        expect(actual).to.eql('.fez');
      });
    });

  });

  describe('when a filename with two extensions is passed:', function() {
    var filepath = 'foo/bar/baz.min.js';

    it('should return the full extension', function() {
      var actual = ext(filepath);
      expect(actual).to.eql('.min.js');
    });

    it('should return the first extension', function() {
      var actual = ext(filepath, {extDot: 'first'});
      expect(actual).to.eql('.min');
    });

    it('should return the last extension', function() {
      var actual = ext(filepath, {extDot: 'last'});
      expect(actual).to.eql('.js');
    });

    describe('and ext is defined in the options:', function() {
      it('should return the defined ext', function() {
        var actual = ext(filepath, {ext: '.fez'});
        expect(actual).to.eql('.fez');
      });
    });
  });

  describe('when a filename with one extension is passed:', function() {
    var filepath = 'foo/bar/baz.js';

    it('should return the extension', function() {
      var actual = ext(filepath);
      expect(actual).to.eql('.js');
    });

    it('should return the first extension', function() {
      var actual = ext(filepath, {extDot: 'first'});
      expect(actual).to.eql('.js');
    });

    it('should return the last extension', function() {
      var actual = ext(filepath, {extDot: 'last'});
      expect(actual).to.eql('.js');
    });

    describe('and ext is defined in the options:', function() {
      it('should return the defined ext', function() {
        var actual = ext(filepath, {ext: '.fez'});
        expect(actual).to.eql('.fez');
      });
    });
  });

  describe('when a filename with no extension is passed to ext:', function() {
    var filepath = 'foo/bar/baz';

    it('should return an empty string', function() {
      var actual = ext(filepath);
      expect(actual).to.eql('');
    });

    describe('and ext is defined in the options:', function() {
      it('should return the defined ext', function() {
        var actual = ext(filepath, {ext: '.fez'});
        expect(actual).to.eql('.fez');
      });
    });

    describe('and extDot `first` or `last` is defined:', function() {
      it('should return an empty string', function() {
        var actual = ext(filepath, {extDot: 'first'});
        expect(actual).to.eql('');
      });

      it('should return an empty string', function() {
        var actual = ext(filepath, {extDot: 'last'});
        expect(actual).to.eql('');
      });
    });
  });
});

