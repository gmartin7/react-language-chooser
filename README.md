react-language-chooser
======================

React component created at LSDev Conference 2019. 



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

# Licence

MIT

