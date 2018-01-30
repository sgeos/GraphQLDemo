var Schema = require('graph.ql')

module.exports = function (loader) {
  return Schema(`
    # A date.  This scalar datatype is not built into GraphQL.
    scalar Date

    # A character in the Star Wars universe.
    type Character {
      # The name of the character.
      name: String!
      # The eye color of the character.
      eye_color: String
      # The gender of the character.
      gender: String
      # The homeworld the character.
      homeworld(): Planet
      # The films the character has appeared in.
      films(): [Film]
    }

    # A Star Wars film.
    type Film {
      # The title of the film.
      title: String!
      # The producers of the film.
      producers(): [String]
      # The characters in the film.
      characters(limit: Int): [Character]
      # The release date of the film.
      release_date: Date
    }

    # A planet in the Star Wars universe.
    type Planet {
      # The name of the planet.
      name: String!
      # The population of the planet.
      # This field is a string because some populations are so
      # large they can not be represented by a 32 bit integer.
      # Additionally, some populations are unknown or otherwise have a textual description.
      population: String
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

