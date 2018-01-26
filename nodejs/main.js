var Schema = require('graph.ql')

var schema = Schema(`
  scalar Date

  type Person {
    name: String!
    homeworld: Planet
    films: [Film]
  }

  type Film {
    title: String!
    producers: [String]
    characters: [Person]
    release_date: Date
  }

  type Planet {
    name: String!
    population: Int
  }

  type Query {
    film (id: Int): Film
    person (id: Int): Person
  }
`, {
  Date: {

  },
  Character: {

  },
  Film: {

  },
  Planet: {

  },
  Query: {

  }
})

// schema(<query>, <variables>)
//   .then(function (res) {
//     console.log(res)
//   })

