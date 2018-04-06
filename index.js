const mobileData = require('./data/prefixes.json')
const mapper = require('country-mapper')

/**
 * Return country name in iso format by free countryName
 * Example: Russia should be converted to Russian Federation
 *  USA should be converted to United States
 * @param name
 * @returns {*}
 */
let isoCountryName = (name) => {
  return mapper.iso(name.replace(/((:?\s)+\(.*\))|(\[.*\])/, '')) || name
}

/**
 * search in 'data' or 'mobileData' by 'field' names in 'search' param
 * @param search what we search
 * @param field by name
 * @param isReplace replace all spaces in 'search'
 * @param data source, replaced on mobileData (filtered data)
 * @returns {Array}
 */
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

  return (data || mobileData).filter(item => {
    let fieldValue = item[field].toLowerCase()
    let start = fieldValue.replace(/^\+/g, '\\+')
    let regex = new RegExp('^' + start.replace(/x/gi, '\\d'), 'gi')
    return regex.test(search)
  })
}

// filter mobileData by country name
let _getDataByCountry = (countryName) => {
  let data = mobileData
  if (countryName) {
    countryName = isoCountryName(countryName).toLowerCase()
    data = data.filter(item => {
      return (item.countryName.toLowerCase() === countryName)
    })
  }
  return (data)
}

module.exports = {
  byCallingCode (callingCode) {
    return findByField(callingCode, 'callingCode', true)
  },

  byCountryName (countryName) {
    return _getDataByCountry(countryName)
  },

  byMobilePrefix (mobilePrefix, countryName) {
    let data = _getDataByCountry(countryName)
    return findByField(mobilePrefix, 'mobilePrefix', false, data)
  },

  byCarrierName (carrierName, countryName) {
    let data = _getDataByCountry(countryName)
    return data.filter(item => {
      return item.carrierName.indexOf(carrierName) >= 0
    })
  },

  byPhone (phone, countryName) {
    phone = '+' + phone.replace(/\D/g, '')
    let data = _getDataByCountry(countryName)
    return findByField(phone, 'fullCode', false, data)
  }
}
