import React, { useState, useEffect } from 'react'

// import { useDispatch } from 'react-redux'
import axios from 'axios'

const apiURL = ['https://game-api.skymavis.com/game-api/clients/', '/items/1']

const BASE_UNIT_OPTIONS_CONSTANTS = {
  SLP: 'slp',
  USD: 'usd',
  ETH: 'eth',
}

const Dashboard = ({}) => {
  // const dispatch = useDispatch()

  const [totalSlp, setTotalSlp] = useState(0)
  const [finalResult, setFinalResult] = useState([])
  const [ccToUSD, setCcToUSD] = useState({})

  const [baseUnit, setBaseUnit] = useState(BASE_UNIT_OPTIONS_CONSTANTS.SLP)
  const [baseUnitNumeric, setBaseUnitNumeric] = useState(1)
  
  useEffect(async () => {
    try {
      const roninAddress = await (await axios.get('/api/daily/')).data.response.data.wallets

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

      setTotalSlp(acc)
      setFinalResult([ ...roninAddress ])

      const coinPrices = await axios.get('/api/coins/all')

      setCcToUSD({ ...coinPrices.data.response.data })
    } catch (e) {
      console.error(e)
    }

    return () => {}
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        className="card"
        style={{
          maxWidth: 1024,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '5vh',
          marginLeft: 8,
          marginRight: 8,
          padding: 8,
          minWidth: 391,
        }}
      >
        <h4 className="mt-2">
          Dashboard
        </h4>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ borderRadius: '50%' }}
        >
          +
        </button>
        <br />

        <div><strong>ETH:</strong> ${ccToUSD.eth}</div>
        <div><strong>SLP:</strong> ${ccToUSD.slp}</div>
        <br />

        <div>
          <strong>Total (manager):</strong>
          &nbsp;{totalSlp} slp |
          &nbsp;${Math.round(totalSlp * ccToUSD.slp * 100) / 100} |
          {/* &nbsp;{Math.round(totalSlp * ccToUSD.slp / ccToUSD.eth * 100000000) / 100000000} eth */}
          &nbsp;{Math.round(totalSlp * ccToUSD.slp / ccToUSD.eth * 100000) / 100000} eth
        </div>
        <br />

        <div class="btn-group" role="group" aria-label="Radio toggle for basic unit of table">
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="val-slp"
            autocomplete="off"
            checked={baseUnit === BASE_UNIT_OPTIONS_CONSTANTS.SLP}
            onClick={() => {
              setBaseUnit(BASE_UNIT_OPTIONS_CONSTANTS.SLP)
              setBaseUnitNumeric(1)
            }}
          />
          <label class="btn btn-outline-primary" for="val-slp">
            SLP
          </label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="val-usd"
            autocomplete="off"
            checked={baseUnit === BASE_UNIT_OPTIONS_CONSTANTS.USD}
            onClick={() => {
              setBaseUnit(BASE_UNIT_OPTIONS_CONSTANTS.USD)
              setBaseUnitNumeric(Math.round(ccToUSD.slp * 100) / 100)
            }}
          />
          <label class="btn btn-outline-primary" for="val-usd">USD</label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="val-eth"
            autocomplete="off"
            checked={baseUnit === BASE_UNIT_OPTIONS_CONSTANTS.ETH}
            onClick={() => {
              setBaseUnit(BASE_UNIT_OPTIONS_CONSTANTS.ETH)
              setBaseUnitNumeric(Math.round(ccToUSD.slp / ccToUSD.eth * 100000) / 100000)
            }}
          />
          <label class="btn btn-outline-primary" for="val-eth">ETH</label>
        </div>

        <table className="table table-striped">
          <caption>Note: All units are in {baseUnit.toUpperCase()} except for 'Split' column</caption>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }} scope="col">Name</th>
              <th style={{ textAlign: 'center' }} scope="col">Total</th>
              <th style={{ textAlign: 'center' }} scope="col">Daily</th>
              <th style={{ textAlign: 'center' }} scope="col">Manager</th>
              <th style={{ textAlign: 'center' }} scope="col">Scholar</th>
              <th style={{ textAlign: 'center' }} scope="col">Split</th>
            </tr>
          </thead>
          <tbody>
            {finalResult.length ? finalResult.map((r, i) => (
              <tr key={`row-${i}`}>
                <th scope="row"><strong>{r.user}</strong></th>
                <td style={{ textAlign: 'right' }}>{r.total * baseUnitNumeric}</td>
                <td style={{ textAlign: 'right' }}>{(r.total - r.start) * baseUnitNumeric}</td>
                <td style={{ textAlign: 'right' }}>{(r.total * r.rate) * baseUnitNumeric}</td>
                <td style={{ textAlign: 'right' }}>{(r.total * (1 - r.rate)) * baseUnitNumeric}</td>
                <td style={{ textAlign: 'center' }}>{r.rate * 100}%</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={100} style={{ textAlign: 'center' }}>
                  No Data
                  <br/>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Add scholar
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="staticBackdropLabel"
                >
                  {/* Modal title */}
                  Add scholar
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                Coming soon...
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  {/* Understood */}
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
