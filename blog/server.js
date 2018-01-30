var graphql = require('express-graph.ql')
var express = require('express')
var Schema = require('./schema.js')
var app = express()

app.post('/query', graphql(Schema))

let port = process.env.PORT || 5000

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})

