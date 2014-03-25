[![Build Status](https://circleci.com/gh/segmentio/replace-document-write.png?circle-token=c6bfdb10c645559af1f7aa994d8b46493313982e)](https://circleci.com/gh/segmentio/replace-document-write)

# replace-document-write

  Replaces document write, for all the dumb analytics snippets which can only be loaded synchronously.

## Installation

  Install with [component(1)](http://component.io):

    $ component install segmentio/replace-document-write

## API

Replaces the `document.write` function until it gets called loading a script which matches the substring

```js
var write = require('replace-document-write');

write('googleadservices.com', function(){
  console.log('document.write restored!');
});

```

## License

  The MIT License (MIT)

  Copyright (c) 2014 Segment.io

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.