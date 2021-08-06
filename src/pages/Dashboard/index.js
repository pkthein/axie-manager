import React, { useState, useEffect } from 'react'

// import { useDispatch } from 'react-redux'
import axios from 'axios'

const apiURL = ['https://game-api.skymavis.com/game-api/clients/', '/items/1']

const Dashboard = ({}) => {
  // const dispatch = useDispatch()

  const [totalSlp, setTotalSlp] = useState(0)
  const [finalResult, setFinalResult] = useState([])
  const [ccToUSD, setCcToUSD] = useState({})
  
  useEffect(async () => {
    try {
      const roninAddress = await (await axios.get('/api/daily')).data.response.data.wallets

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
        style={{ maxWidth: 1024, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5vh' }}
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
          &nbsp;{Math.round(totalSlp * ccToUSD.slp / ccToUSD.eth * 100000000) / 100000000} eth
        </div>
        <br />

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">SLP (total)</th>
              <th scope="col">Daily [slp]</th>
              <th scope="col">Manager [slp]</th>
              <th scope="col">Scholar [slp]</th>
              <th scope="col">Rate [m|s]</th>
            </tr>
          </thead>
          <tbody>
            {finalResult.length ? finalResult.map((r, i) => (
              <tr key={`row-${i}`}>
                <th scope="row"><strong>{r.user}</strong></th>
                <td style={{ textAlign: 'right' }}>{r.total}</td>
                <td style={{ textAlign: 'right' }}>{r.total - r.start}</td>
                <td style={{ textAlign: 'right' }}>{r.total * r.rate}</td>
                <td style={{ textAlign: 'right' }}>{r.total * (1 - r.rate)}</td>
                <td style={{ textAlign: 'center' }}>{r.rate}</td>
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
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                ...
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
                  Understood
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
