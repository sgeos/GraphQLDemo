let DataLoader = require('dataloader')
let axios = require('axios')

let host = 'http://swapi.co/api'

module.exports = function () {
  return {
    film: DataLoaderFromApiEndpoint ('films'),
    character: DataLoaderFromApiEndpoint ('people'),
    planet: DataLoaderFromApiEndpoint ('planets')
  }
}
 
function DataLoaderFromApiEndpoint (endpoint) {
  return new DataLoader(function (ids) {
    return axios.all(ids.map(id => {
      let url = Number.isInteger(id)
        ? `${host}/${endpoint}/${id}/`
        : id
      return axios.get(url).then(res => res.data)
    }))
  })
}

