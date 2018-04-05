const mobileData = require('./data/prefixes.json')
const _ = require('lodash')
const mapper = require('country-mapper')

let isoCountryName = (name) => {
  return mapper.iso(name.replace(/((:?\s)+\(.*\))|(\[.*\])/, '')) || name
}

let findByField = (search, field, isReplace, data) => {
  if (!search) {
    return ([])
  }

  if (isReplace === true) {
    // calling code to string and replace all spaces
    search = search.toString().replace(/\s/g, '')
    if (!/^\+/.test(search)) {
      search = '+' + search
    }
  }

  return _.filter(data || mobileData, (item) => {
    let fieldValue = item[field].toLowerCase()
    if (/x/.test(fieldValue)) {
      let regex = new RegExp(fieldValue.replace('x', '\\d'), 'g')
      return regex.test(search.toLowerCase())
    } else {
      return fieldValue === search.toLowerCase()
    }
  })
}

module.exports = {
  byCallingCode (callingCode) {
    return findByField(callingCode, 'callingCode', true)
  },

  byCountryName (countryName) {
    let name = isoCountryName(countryName)
    return _.filter(mobileData, (item) => {
      return (item.countryName.toLowerCase() === name.toLowerCase())
    })
  },

  byMobilePrefix (mobilePrefix, countryName) {
    let data = mobileData
    if (countryName) {
      countryName = mapper.iso(countryName).toLowerCase()
      data = _.filter(data, (item) => {
        return (item.countryName.toLowerCase() === countryName)
      })
    }
    return findByField(mobilePrefix, 'mobilePrefix', false, data)
  },

  byCarrierName (carrierName) {
    return findByField(carrierName, 'carrierName', false)
  }
}
