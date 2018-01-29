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

The **npm** libraries [graph.ql][npm-graphql], [axios][npm-axios], [express][npm-express]
and [express-graph.ql][npm-express-graphiql] are also required for this demo.
Note that **graph.ql** and **express-graph.ql** are not official GraphQL libraries!
Also note that **axios** could easily be swapped for your HTTP client of choice.

```sh
npm install graph.ql # not the official GraphQL library!
npm install axios # could easily swap in any HTTP client
npm install express
npm install express-graph.ql # also not the official!
```

Run the demo with **node** as follows.

```sh
node nodejs/server.js
```

Download and install the [GraphiQL Standalone Tool][graphiql-standalone] to run GraphQL queries.
Note that the tool has an 'i' in the name, Graph *i* QL.
Navigate to the [http://localhost:5000/query][localhost-5000-query] and enter the following query.

```graphql
query find ($film: Int!) {
  film: find_film(id: $film) {
    title
    release_date
    characters (limit: 3) {
      name
      eye_color
      gender
      homeworld {
        name
        population
      }
      films {
        title
      }
    }
  }
}
```

```javascript
{
  "film": 4
}
```

The demo makes use of the [Star Wars API][star-wars-api].
The query should return the following results.

```javascript
{
  "data": {
    "film": {
      "title": "The Phantom Menace",
      "release_date": "1999-05-19T00:00:00.000Z",
      "characters": [
        {
          "name": "C-3PO",
          "eye_color": "yellow",
          "gender": "n/a",
          "homeworld": {
            "name": "Tatooine",
            "population": "200000"
          },
          "films": [
            {
              "title": "The Empire Strikes Back"
            },
            {
              "title": "Attack of the Clones"
            },
            {
              "title": "The Phantom Menace"
            },
            {
              "title": "Revenge of the Sith"
            },
            {
              "title": "Return of the Jedi"
            },
            {
              "title": "A New Hope"
            }
          ]
        },
        {
          "name": "R2-D2",
          "eye_color": "red",
          "gender": "n/a",
          "homeworld": {
            "name": "Naboo",
            "population": "4500000000"
          },
          "films": [
            {
              "title": "The Empire Strikes Back"
            },
            {
              "title": "Attack of the Clones"
            },
            {
              "title": "The Phantom Menace"
            },
            {
              "title": "Revenge of the Sith"
            },
            {
              "title": "Return of the Jedi"
            },
            {
              "title": "A New Hope"
            },
            {
              "title": "The Force Awakens"
            }
          ]
        },
        {
          "name": "Obi-Wan Kenobi",
          "eye_color": "blue-gray",
          "gender": "male",
          "homeworld": {
            "name": "Stewjon",
            "population": "unknown"
          },
          "films": [
            {
              "title": "The Empire Strikes Back"
            },
            {
              "title": "Attack of the Clones"
            },
            {
              "title": "The Phantom Menace"
            },
            {
              "title": "Revenge of the Sith"
            },
            {
              "title": "Return of the Jedi"
            },
            {
              "title": "A New Hope"
            }
          ]
        }
      ]
    }
  }
}
```

## References:

- [GraphiQL Standalone Tool][graphiql-standalone]
- [JSON Formatter][json-formatter]
- [Localhost, Port 5000][localhost-5000]
- [Localhost, Port 5000, GraphQL Query][localhost-5000-query]
- [Node.js][nodejs]
- [npm, axios][npm-axios]
- [npm, express][npm-express]
- [npm, express-graph.ql][npm-express-graphiql]
- [npm, graph.ql][npm-graphql]
- [Star Wars API][star-wars-api]
- [Udemy][udemy]
- [Udemy, Building Better APIs with GraphQL][udemy-graphql]

[graphiql-standalone]: https://github.com/skevy/graphiql-app
[json-formatter]: https://jsonformatter.curiousconcept.com
[localhost-5000]: http://localhost:5000
[localhost-5000-query]: http://localhost:5000/query
[nodejs]: https://nodejs.org/
[npm-axios]: https://www.npmjs.com/package/axios
[npm-express]: https://www.npmjs.com/package/express
[npm-express-graphiql]: https://www.npmjs.com/package/express-graph.ql
[npm-graphql]: https://www.npmjs.com/package/graph.ql
[star-wars-api]: https://swapi.co
[udemy]: https://www.udemy.com
[udemy-graphql]: https://www.udemy.com/building-better-apis-with-graphql/

