var DataLoader = require('dataloader')
var axios = require('axios')

// film.load(<id>)
//   .then(film_data => console.log(film_data))

// film.loadMany([<id>, <id2>, <id3>])
//   .then(films => console.log(films))

module.exports = function () {
  return {
    film: Film(),
    character: Character(),
    planet: Planet()
  }
}

function Film () {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/films/${id}/` : id
      return axios.get(url).then(res => res.data)
    }))
  })
}

function Character () {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/people/${id}/` : id
      return axios.get(url).then(res => res.data)
    }))
  })
}

function Planet () {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      var url = Number.isInteger(id) ? `http://swapi.co/api/planets/${id}/` : id
      return axios.get(url).then(res => res.data)
    }))
  })
}

// function test() {
//   var film = Film()
//   film.loadMany([1, 'http://swapi.co/api/films/3/'])
//     .then(data => console.log(data))
//   var character = Character()
//   character.loadMany([1, 'http://swapi.co/api/people/3/'])
//     .then(data => console.log(data))
//   var planet = Planet()
//   planet.loadMany([1, 'http://swapi.co/api/planets/3/'])
//     .then(data => console.log(data))
// }
// 
// test()

