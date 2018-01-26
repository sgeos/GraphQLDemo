# GraphQLDemo

A GraphQL demo project using the JavaScript reference implementation and Node.js.
The source code for this project is based on the [Udemy][udemy]
course [Building Better APIs with GraphQL][udemy-graphql].

Note that installing [Node.js][nodejs] is a prerequisite for running this demo code.
Installation is left as an exercise for the reader.
Any version over 4 should work.

# Software Versions

```sh
$ date -u "+%Y-%m-%d %H:%M:%S +0000"
2018-01-26 01:25:02 +0000
$ uname -vm
Darwin Kernel Version 17.3.0: Thu Nov  9 18:09:22 PST 2017; root:xnu-4570.31.3~1/RELEASE_X86_64 x86_64
$ node -v # any version over 4 should be work
v6.12.0
$ npm -v
4.6.1
```

The **npm** libraries [graph.ql][npm-graphql], [axios][npm-axios] and [express][npm-express]
are also required for this demo.
Note that **graph.ql** is not the official GraphQL library!
Also note that **axios** could easily be swapped for your HTTP client of choice.

```sh
npm install graph.ql # not the official GraphQL library!
npm install axios # could easily swap in any HTTP client
npm install express
```

Run the demo with **node** as follows.

```sh
node nodejs/server.js
```

The server will serve [port 5000 on the localhost][localhost-5000].
A [JSON formatter][json-formatter] may be useful to review the response.
The demo makes use of the [Star Wars API][star-wars-api].

## References:

- [JSON Formatter][json-formatter]
- [Localhost, Port 5000][localhost-5000]
- [Node.js][nodejs]
- [npm, axios][npm-axios]
- [npm, express][npm-express]
- [npm, graph.ql][npm-graphql]
- [Star Wars API][star-wars-api]
- [Udemy][udemy]
- [Udemy, Building Better APIs with GraphQL][udemy-graphql]

[json-formatter]: https://jsonformatter.curiousconcept.com
[localhost-5000]: http://localhost:5000
[nodejs]: https://nodejs.org/
[npm-axios]: https://www.npmjs.com/package/axios
[npm-express]: https://www.npmjs.com/package/express
[npm-graphql]: https://www.npmjs.com/package/graph.ql
[star-wars-api]: https://swapi.co
[udemy]: https://www.udemy.com
[udemy-graphql]: https://www.udemy.com/building-better-apis-with-graphql/

