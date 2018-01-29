var Schema = require('graph.ql')

module.exports = function (loader) {
  return Schema(`
    scalar Date

    type Character {
      name: String!
      eye_color: String
      gender: String
      homeworld(): Planet
      films(): [Film]
    }

    type Film {
      title: String!
      producers(): [String]
      characters(limit: Int): [Character]
      release_date: Date
    }

    type Planet {
      name: String!
      population: String # Int is limited to 32 bits
    }

    # These are the queries available on this server.
    type Query {
      # Find a film by id.
      find_film (id: Int): Film
      # Find a character by id.
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
      homeworld (character, args) {
        //console.log("homeworld(", "character =", character, ", args =", args, ")")
        return loader.planet.load(character.homeworld)
      },
      films (character, args) {
        //console.log("films(", "character =", character, ", args =", args, ")")
        return loader.film.loadMany(character.films)
      }
    },
    Film: {
      producers (film, args) {
        //console.log("producers(", "film =", film, ", args =", args, ")")
        return film.producer.split(/\s*,\s*/)
      },
      characters (film, args) {
        //console.log("characters(", "film =", film, ", args =", args, ")")
        var characters = args.limit
          ? film.characters.slice(0, args.limit)
          : film.characters
        return loader.character.loadMany(characters)
      }
    },
    //Planet: { },
    Query: {
      find_film (query, args) {
        //console.log("find_film(", "query =", query, ", args =", args, ")")
        return loader.film.load(args.id)
      },
      find_character (query, args) {
        //console.log("find_character(", "query =", query, ", args =", args, ")")
        return loader.character.load(args.id)
      }
    }
  })
}

// schema(`
//   query find ($film: Int) {
//     film: find_film(id: $film) {
//       title
//       producers
//       release_date
//       characters (limit: 4) {
//         name
//         films {
//           title
//           release_date
//         }
//         homeworld {
//           name
//           population
//         }
//       }
//     }
//   }
// `, {
//   film: 1
// }).then(function (res) {
//   console.dir(res, { colors: true, depth: Infinity })
// })

// schema(<query>, <variables>)
//   .then(function (res) {
//     console.log(res)
//   })

