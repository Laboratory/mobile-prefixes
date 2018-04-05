# mobile-prefixes
List of mobile phone number series by country. We are using offline public data

# Installation

Via [npm](https://www.npmjs.com/package/mobile-prefixes):

    npm install mobile-prefixes

### Usage

Get all Countries by calling codes starting on +1
```javascript
  const prefixes = require('mobile-prefixes');
  console.log(prefixes.byCallingCode('+1'))
```
Result:
```javascript
 [ { countryName: 'American Samoa',
    callingCode: '+1',
    mobilePrefix: '684',
    fullCode: '+1684',
    carrierName: '' },
  { countryName: 'Anguilla',
    callingCode: '+1',
    mobilePrefix: '264772',
    fullCode: '+1264772',
    carrierName: '' },
    ...
]
```

Get all mobile operators by County name

```javascript
  const prefixes = require('mobile-prefixes');
  console.log(prefixes.byCountryName('Switzerland'))
```
Result:
```
[ { countryName: 'Switzerland',
    callingCode: '+41',
    mobilePrefix: '74',
    fullCode: '+4174',
    carrierName: '' },
  { countryName: 'Switzerland',
    callingCode: '+41',
    mobilePrefix: '76',
    fullCode: '+4176',
    carrierName: 'Sunrise (TDC Switzerland)' },
  { countryName: 'Switzerland',
    callingCode: '+41',
    mobilePrefix: '77',
    fullCode: '+4177',
    carrierName: 'Swisscom Used by Migros' },
  { countryName: 'Switzerland',
    callingCode: '+41',
    mobilePrefix: '78',
    fullCode: '+4178',
    carrierName: 'SALT' },
  { countryName: 'Switzerland',
    callingCode: '+41',
    mobilePrefix: '79',
    fullCode: '+4179',
    carrierName: 'Swisscom' } ]
```

Get all prefixes by carrier name
```javascript
  const prefixes = require('mobile-prefixes');
  console.log(prefixes.byCarrierName('Megafon'))
```
Result:
```javascript
[ { countryName: 'Russian Federation',
    callingCode: '+7',
    mobilePrefix: '92x',
    fullCode: '+792x',
    carrierName: 'Megafon' },
  { countryName: 'Russian Federation',
    callingCode: '+7',
    mobilePrefix: '93x',
    fullCode: '+793x',
    carrierName: 'Megafon' } ]
```

Get carriers by prefix, using only with country name
```javascript
  const prefixes = require('mobile-prefixes');
  console.log(prefixes.byMobilePrefix('743', 'Romania'))
```
Result:
```javascript
[ { countryName: 'Romania',
    callingCode: '+40',
    mobilePrefix: '74x',
    fullCode: '+4074x',
    carrierName: 'Orange Romania' } ]
```

Get operator by phone number (preferably using international formatted number E.164), using only with country name
```javascript
  const prefixes = require('mobile-prefixes');
  console.log(prefixes.byPhone('+557790000', 'Brazil'))
```
Result:
```javascript
[ { countryName: 'Brazil',
    callingCode: '+55',
    mobilePrefix: 'xx9',
    fullCode: '+55xx9',
    carrierName: '' } ]
```