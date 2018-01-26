var Schema = require('graph.ql')

var characters = {
  1: {
    id: 1,
    name: 'Matt'
  },
  2: {
    id: 2,
    name: 'Nicole'
  },
  3: {
    id: 3,
    name: 'Tammy'
  }
}

var schema = Schema(`
  scalar Date

  type Character {
    id: Int
    name: String!
    homeworld: Planet
    films: [Film]
  }

  type Film {
    title: String!
    producers(): [String]
    characters(): [Character]
    release_date: Date
  }

  type Planet {
    name: String!
    population: Int
  }

  type Query {
    find_film (id: Int): Film
    find_character (id: Int): Character
  }
`, {
  Date: {
    serialize (v) {
      //console.log("serialize(", "v =", v, ")")
      return new Date(v)
    }
  },
  Character: {

  },
  Film: {
    producers (film, args) {
      //console.log("producers(", "film =", film, ", args =", args, ")")
      return film.producers.split(',')
    },
    characters (film, args) {
      //console.log("characters(", "film =", film, ", args =", args, ")")
      return film.character_ids.map(function (id) {
        //console.log("characters() => film.character_ids.map( function(", "id =", id, ")", "characters[id] =", characters[id])
        return characters[id]
      })
    }
  },
  Planet: {

  },
  Query: {
    find_film (query, args) {
      //console.log("find_film(", "query =", query, ", args =", args, ")")
      return {
        title: 'A New Hope',
        producers: 'John,Matt,Marc',
        release_date: '1984-02-12',
        character_ids: [1, 2, 3]
      }
    },
    find_character (query, args) {
      //console.log("find_character(", "query =", query, ", args =", args, ")")

    }
  }
})

schema(`
  query find ($film: Int) {
    film: find_film(id: $film) {
      title
      producers
      release_date
      characters {
        id
        name
      }
    }
  }
`, {
  film: 1
}).then(function (res) {
  console.dir(res, { colors: true, depth: Infinity })
})

// schema(<query>, <variables>)
//   .then(function (res) {
//     console.log(res)
//   })

