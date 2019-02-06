react-language-chooser
======================

React component created at LSDev Conference 2019. 

https://whatdandoes.info

# Install

```
git clone https://github.com/WhatDanDoes/react-language-chooser.git
cd react-language-chooser && npm install
```

# Development

Run server:

```
npm start
```

In development mode, the server listens on port `3001` (i.e., go to `http://localhost:3001` to view the app).

# Tests

`react-language-chooser` uses `jasmine` and `zombie` for testing:

```
npm test
```

# Production

## App

Clone:

```
git clone https://github.com/WhatDanDoes/react-language-chooser.git
```

In the application directory:

```
cd react-language-chooser
NODE_ENV=production npm install
NODE_ENV=production npm run build
```

The _Dockerized_ production is meant to be deployed behind an `nginx-proxy`/`lets-encrypt` combo:

```
docker-compose -f docker-compose.prod.yml up -d
```

## Work that needs to be done:

### Mocked data

The current data structure was inferred from the screenshot. It is much different than the actual data, which can be obtained here: https://ldml.api.sil.org?query=alltags&ext=json

### Code refactoring:

There are a bunch of things - mostly concerning naming - that I'm not satisfied with

### Organization:

The structure of the project is totally ad hoc.

### Shipping:

I've never bundled a React component for general consumption

### Marketing:

The demo landing page could use a little love. It looks kind of hokey right now: https://demo.whatdandoes.info

### Bugs:

- Selecting and deselecting multiple languages in random order produces unexpected results when the languages are added. Needs a test.


## God's peace

