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
    return mobileData.filter(item => {
      return (item.countryName.toLowerCase() === name.toLowerCase())
    })
  },

  byMobilePrefix (mobilePrefix, countryName) {
    let data = mobileData
    if (countryName) {
      countryName = mapper.iso(countryName).toLowerCase()
      data = data.filter(item => {
        return (item.countryName.toLowerCase() === countryName)
      })
    }
    return findByField(mobilePrefix, 'mobilePrefix', false, data)
  },

  byCarrierName (carrierName) {
    return findByField(carrierName, 'carrierName', false)
  }
}
