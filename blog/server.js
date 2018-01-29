var graphql = require('express-graph.ql')
var express = require('express')
var Schema = require('./schema.js')
var app = express()

app.post('/query', graphql(Schema))

app.listen(5000, function () {
  console.log('listening on port 5000')
})

