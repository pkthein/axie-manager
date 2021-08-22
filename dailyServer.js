// const bodyParser = require('body-parser');
const express = require('express')
const app = require('express')()
const axios = require('axios')

const port = 3000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json());

/**
 * Middleware that all requests are authenticated.
 */
app.use((req, res, next) => {
  const apiUrl = req.originalUrl
  const httpMethod = req.method

  console.log(httpMethod, apiUrl)

  next()
})

const apiURL = ['https://game-api.skymavis.com/game-api/clients/', '/items/1']

const roninAddress = [
  {
    add: '0x684bcca125640a5aeaa82d4710987e0591be1434',
    user: 'jk',
    rate: 1,
    start: 3064,
    total: 0,
    earnings: [1795, 1985, 2204, 2397, 2652, 2854, 3064],
  },
  {
    add: '0xa06775d35109ebb35ad97f79984bc338f9eb5cc5',
    user: 'pkt',
    rate: 1,
    start: 2298,
    total: 0,
    earnings: [1326, 1458, 1650, 1779, 1902, 2139, 2298],
  },
  {
    add: '0x6a8f0e45373da828468deb009e35beb26ee005fa',
    user: 'mpt',
    rate: 0.5,
    start: 1112,
    total: 0,
    earnings: [562, 667, 757, 848, 941, 1028, 1112],
  },
  {
    add: '0x24cc2be5ae3d3e1286b939e7bfda1a5bd34dc82c',
    user: 'pl',
    rate: 0.5,
    start: 1813,
    total: 0,
    earnings: [1082, 1199, 1287, 1405, 1543, 1690, 1813],
  },
  {
    add: '0xe2be035e84050275439592b1da5f4909f2c89854',
    user: 'jkb',
    rate: 0.5,
    start: 1891,
    total: 0,
    earnings: [1004, 1327, 1444, 1555, 1666, 1780, 1891],
  },
  {
    add: '0xe62f97068f587cae939b65865d22fda9d8a68d9f',
    user: 'pls',
    rate: 0.5,
    start: 2222,
    total: 0,
    earnings: [1645, 1732, 1826, 1933, 2044, 2137, 2222],
  },
  {
    add: '0x6bf47dd0c5f59101ab823c5d587ffb8580776539',
    user: 'plc1',
    rate: 0.5,
    start: 545,
    total: 0,
    earnings: [95, 170, 245, 320, 395, 470, 545],
  },
  {
    add: '0xc9237a257036f6f525b68718bec269bb85312843',
    user: 'plc2',
    rate: 0.5,
    start: 0,
    total: 0,
    earnings: [],
  },
]

const data = {}

const getAddresses = async () => {
  try {
    const timeOfInterest = new Date()

    // game server resets at 00:00 UTC ;]
    if (timeOfInterest.getHours() === 0 && timeOfInterest.getMinutes() > 0 && timeOfInterest.getMinutes() <= 5) {
      const p = roninAddress.map(address => {
        return axios.get(`${apiURL[0] + address.add + apiURL[1]}`)
      })
  
      const res = await Promise.all(p)
  
      res.forEach((r, i) => {
        const { data } = r
        roninAddress[i].total = data.total
        roninAddress[i].start = data.total

        roninAddress[i].earnings.push(data.total)

        // set the list to 2 weeks
        if (roninAddress[i].earnings.length > 14) {
          roninAddress[i].earnings.shift()
        }
      })

      data.wallets = [ ...roninAddress ]
    }
  } catch (e) {
    console.log(e)
  }
}

const getWalletData = async () => {
  try {
    const p = roninAddress.map(address => {
      return axios.get(`${apiURL[0] + address.add + apiURL[1]}`)
    })

    const res = await Promise.all(p)
    let acc = 0

    res.forEach((r, i) => {
      const { data } = r
      roninAddress[i].total = data.total 
      acc += data.total * roninAddress[i].rate
    })

    data.wallets = [ ...roninAddress ]
    data.managerTotal = acc
  } catch (e) {
    console.log(e)
  }
}

getAddresses()
// call every 5 mins
setInterval(getAddresses, 5 * 60 * 1000)

// not in use right now
app.get('/api/daily', async (req, res, next) => {
  try {
    res.data = { data }
    handle200Response(req, res)
  } catch (error) {
    console.log("ERRORED /api/daily", error);
    return res.status(400).send({
      ok: false,
      error: {
        reason: "Bad Request", code: 400
      }
    });
  }
});

app.get('/api/daily/fetch', async (req, res, next) => {
  try {
    await getWalletData()
    res.data = { data }
    handle200Response(req, res)
  } catch (error) {
    console.log("ERRORED /api/notes/all", error);
    return res.status(400).send({
      ok: false,
      error: {
        reason: "Bad Request", code: 400
      }
    });
  }
});

// TODO: when the user cashed out
app.get('/api/daily/reset', async (req, res, next) => {
  try {
    res.data = { data }
    handle200Response(req, res)
  } catch (error) {
    console.log("ERRORED /api/notes/all", error);
    return res.status(400).send({
      ok: false,
      error: {
        reason: "Bad Request", code: 400
      }
    });
  }
});

// block the rest of the endpoints
app.all('*', (req, res, next) => {
  if (!req.session || !req.sessionId) {
    return res.status(404).send({
      ok: false,
      error: {
        reason: "Not Found",
        code: 404
      }
    });
  }
});

const handle200Response = (req, res) => {
  res.status(res.statusCode || 200).send({ ok: true, response: res.data });
}

app.listen(port, () => console.log(`Daily server listening on port ${port}!`))
