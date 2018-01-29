var graphql = require('express-graph.ql')
var Schema = require('./schema.js')
var express = require('express')
var app = express()

app.post('/query', graphql(Schema))

// Get results by navigating to something like one of the following URLs.
// http://localhost:5000
// http://localhost:5000?film=4
app.get('/', function (req, res) {
  console.log("/", "query =", req.query)
  console.time('Without data loader')
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
          films {
            title
          }
        }
      }
    }
  `, {
    film: film
  }).then(function (result) {
    console.dir(result, { colors: true, depth: Infinity })
    console.timeEnd('Without data loader')
    res.send(result)
  })
})

app.listen(5000, function () {
  console.log('listening on port 5000')
})

