# docsify
[![Build Status](https://travis-ci.org/QingWei-Li/docsify.svg?branch=master)](https://travis-ci.org/QingWei-Li/docsify)
[![npm](https://img.shields.io/npm/v/docsify.svg)](https://www.npmjs.com/package/docsify)

>🃏 A magical documentation site generator.

## Links
- [Documentation](https://docsify.js.org)
- [CLI](https://github.com/QingWei-Li/docsify-cli)

## Features
- Easy and lightweight
- Custom themes
- No build

## Quick start
Create a `404.html` and `README.md` into `/docs`.

404.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//unpkg.com/docsify/themes/vue.css">
</head>
<body></body>
<script src="//unpkg.com/docsify"></script>
</html>
```

Or Create a `index.html` and using `hash router`.

index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//unpkg.com/docsify/themes/vue.css">
</head>
<body></body>
<script src="//unpkg.com/docsify" data-router></script>
</html>
```

## Showcase
These open-source projects are using docsify to generate their sites. Pull requests welcome : )

- [docsify](https://docsify.js.org) - A magical documentation site generator.
- [Snipaste](https://docs.snipaste.com/) - A new way to boost your productivity.

## How to contribute

- Fork it!
- Run `npm i && npm run dev`
- open `localhost:3000`

## License
MIT
