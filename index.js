var mobileData = require('./data/prefixes.json');
var _ = require('lodash');
var mapper = require('country-mapper');

var isoCountryName = function (name) {
    return mapper.iso(name.replace(/((:?\s)+\(.*\))|(\[.*\])/, '')) || name;
};

var findByField = function (search, field, isReplace, data) {
    if (!search) {
        return ([]);
    }

    if (isReplace == true) {
        // calling code to string and replace all spaces
        search = search.toString().replace(/\s/g, '');
        if (!/^\+/.test(search)) {
            search = '+' + search
        }
    }

    return _.filter(data || mobileData, function (item) {
        var fieldValue = item[field].toLowerCase();
        if (/x/.test(fieldValue)) {
            var regex = new RegExp(fieldValue.replace('x', '\\d'), 'g');
            return regex.test(search.toLowerCase());
        } else {
            return fieldValue == search.toLowerCase();
        }
    });
};

module.exports = {
    byCallingCode: function (callingCode) {
        return findByField(callingCode, 'callingCode', true);
    },

    byCountryName: function (countryName) {
        var name = isoCountryName(countryName);
        return _.filter(mobileData, function (item) {
            return (item.countryName.toLowerCase() == name.toLowerCase());
        });
    },

    byMobilePrefix: function (mobilePrefix, countryName) {
        var data = mobileData;
        if (countryName) {
            countryName = mapper.iso(countryName).toLowerCase();
            data = _.filter(data, function (item) {
                return (item.countryName.toLowerCase() == countryName);
            });
        }
        return findByField(mobilePrefix, 'mobilePrefix', false, data);
    },

    byCarrierName: function (carrierName) {
        return findByField(carrierName, 'carrierName', false);
    }
};
