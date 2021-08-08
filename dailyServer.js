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
  { add: '0xa06775d35109ebb35ad97f79984bc338f9eb5cc5', user: 'pkt', rate: 1, start: 0, total: 0 },
  { add: '0x684bcca125640a5aeaa82d4710987e0591be1434', user: 'jk', rate: 1, start: 0, total: 0 },
  { add: '0x24cc2be5ae3d3e1286b939e7bfda1a5bd34dc82c', user: 'pl', rate: 0.5, start: 0, total: 0 },
  { add: '0xe2be035e84050275439592b1da5f4909f2c89854', user: 'jkb', rate: 0.5, start: 0, total: 0 },
  { add: '0xe62f97068f587cae939b65865d22fda9d8a68d9f', user: 'pls', rate: 0.5, start: 890, total: 0 },
  { add: '0x6a8f0e45373da828468deb009e35beb26ee005fa', user: 'mpt', rate: 0.5, start: 0, total: 0 },
]

const data = {}

const getAddresses = async () => {
  try {
    const timeOfInterest = new Date()

    // UTC to PST is -7 or -8
    // TODO: fix for Day Light Savings
    if (timeOfInterest.getHours() === 24 && timeOfInterest.getMinutes() > 0 && timeOfInterest.getMinutes() <= 5) {
      const p = roninAddress.map(address => {
        return axios.get(`${apiURL[0] + address.add + apiURL[1]}`)
      })
  
      const res = await Promise.all(p)
  
      res.forEach((r, i) => {
        const { data } = r
        roninAddress[i].total = data.total 
        roninAddress[i].start = data.total
      })
    }

    data.wallets = [ ...roninAddress ]
  } catch (e) {
    console.log(e)
  }
}

getAddresses()
// call every 5 mins
setInterval(getAddresses, 5 * 60 * 1000)

app.get('/api/daily', async (req, res, next) => {
  try {
    res.data = { data }
    handle200Response(req, res);
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
