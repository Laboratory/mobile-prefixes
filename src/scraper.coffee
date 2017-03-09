request = require 'request'
fs = require 'fs-path'
cheerio = require 'cheerio'
_ = require 'lodash'
fs = require 'fs-path'
mapper = require 'country-mapper'

isoCountryName = (name)  ->
  return mapper.iso(name.replace(/((:?\s)+\(.*\))|(\[.*\])/, '')) || name

request 'https://en.wikipedia.org/wiki/List_of_mobile_phone_number_series_by_country', (err, res) ->
  return console.error err if err
  body = res.body;
  $ = cheerio.load body
  lastFullNode = null
  data = []
  $('table.wikitable tr:nth-child(n+2)').each ->
    nodes = $(@).children('td')
    nodesCount = nodes.length
    lastFullNode = nodes.first() if nodesCount is 6
    country = lastFullNode.first().text()
    callingCode = lastFullNode.first().next().text()
    mobilePrefix = nodes.eq(if nodesCount is 6 then 2 else 0).text()
    if nodesCount is 6
      carrierIndex = 4
    else if nodesCount is 4
      carrierIndex = 2
    else if nodesCount is 3
      carrierIndex = 1
    else
      carrierIndex = 1
    carrier = nodes.eq(carrierIndex).text()
    
    #split calling codes by /
    if /\//.test callingCode
      callingCode = callingCode.split '/'
      callingCode = callingCode.map (item) ->
        res = /\+\d+/.exec item
        return res[0] if res.length > 0
    else
      callingCode = [callingCode]
    
    callingCode.forEach (code) ->
      data.push
        countryName : isoCountryName country
        callingCode : code
        mobilePrefix: mobilePrefix
        carrierName : carrier
  
  fs.writeFileSync "./data/prefixes.json", JSON.stringify data, null
