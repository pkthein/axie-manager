// const bodyParser = require('body-parser');
const express = require('express');
const app = require('express')();
// const axios = require('axios');

//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

const port = 5000;

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

const data = {}

const getCoins = async () => {
  try {
    const dataETH = await CoinGeckoClient.coins.fetch('ethereum', {})
    const dataSLP = await CoinGeckoClient.coins.fetch('smooth-love-potion', {})
    
    data.eth = dataETH.data.market_data.current_price.usd
    data.slp = dataSLP.data.market_data.current_price.usd
  } catch (e) {
    console.log(e)
  }
}

getCoins()
// call every 5 mins
setInterval(getCoins, 5 * 60 * 1000)

app.get('/api/coins/all', async (req, res, next) => {
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

app.listen(port, () => console.log(`Coin server listening on port ${port}!`))
