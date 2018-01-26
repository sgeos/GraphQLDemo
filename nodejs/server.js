var Schema = require('./schema.js')
var express = require('express')
var app = express()

// Get results by navigating to something like one of the following URLs.
// http://localhost:5000
// http://localhost:5000?film=4
app.get('/', function (req, res) {
  console.log("/", "query =", req.query)
  var film = req.query.film || 1

  Schema(`
    query find ($film: Int) {
      film: find_film(id: $film) {
        title
        release_date
        characters (limit: 3) {
          name
          eye_color
          homeworld {
            name
            population
          }
        }
      }
    }
  `, {
    film: film
  }).then(function (result) {
    console.dir(result, { colors: true, depth: Infinity })
    res.send(result)
  })
})

app.listen(5000, function () {
  console.log('listening on port 5000')
})

