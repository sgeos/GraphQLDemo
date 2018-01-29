var graphql = require('express-graph.ql')
var Schema = require('./schema.js')
var Loader = require('./loader.js')
var express = require('express')
var app = express()

app.use(function (req, res, next) {
  req.loader = Loader()
  next()
})

app.post('/query', graphql(Schema(Loader())))

app.get('/', function (req, res) {
  console.log("/", "query =", req.query)
  console.time('With data loader')
  var film = req.query.film || 1

  Schema(req.loader)(`
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
    console.timeEnd('With data loader')
    res.send(result)
  })
})

app.listen(5000, function () {
  console.log('listening on port 5000')
})

