import React, { useState, useEffect } from 'react'

// import { useDispatch } from 'react-redux'
import axios from 'axios'

const apiURL = ['https://game-api.skymavis.com/game-api/clients/', '/items/1']

const roninAddress = [
  { add: '0xa06775d35109ebb35ad97f79984bc338f9eb5cc5', user: 'pkt', rate: 1 },
  { add: '0x684bcca125640a5aeaa82d4710987e0591be1434', user: 'jk', rate: 1 },
  { add: '0x24cc2be5ae3d3e1286b939e7bfda1a5bd34dc82c', user: 'pl', rate: 0.5 },
  { add: '0xe2be035e84050275439592b1da5f4909f2c89854', user: 'jkb', rate: 0.5 },
  { add: '0xe62f97068f587cae939b65865d22fda9d8a68d9f', user: 'pls', rate: 0.5 },
]

const Dashboard = ({}) => {
  // const dispatch = useDispatch()

  const [totalSlp, setTotalSlp] = useState(0)
  const [finalResult, setFinalResult] = useState([])
  
  useEffect(async () => {
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

      setTotalSlp(acc)
      setFinalResult([ ...roninAddress ])
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

        <div><strong>Total (manager):</strong> {totalSlp} slp</div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">SLP (total)</th>
              <th scope="col">Delta [slp]</th>
              <th scope="col">Manager [slp]</th>
              <th scope="col">Scholar [slp]</th>
              <th scope="col">Rate [m|s]</th>
            </tr>
          </thead>
          <tbody>
            {finalResult.length ? finalResult.map((r, i) => (
              <tr key={`row-${i}`}>
                <th scope="row"><strong>{r.user}</strong></th>
                <td>{r.total}</td>
                <td>N/A</td>
                <td>{r.total * r.rate}</td>
                <td>{r.total * (1 - r.rate)}</td>
                <td>{r.rate}</td>
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
