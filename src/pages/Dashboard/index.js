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
    <div>
      <br />
      <h4>Dashboard</h4>
      <br />

      {finalResult.length && (
        <React.Fragment>
          <ul>
            {finalResult.map((r, i) => (
              <li key={`list-${i}`}>
                <strong>{r.user}:</strong> {r.total} slp ({r.total * r.rate} (mgr) | {r.total * (1 - r.rate)} (sch))
              </li>
            ))}
          </ul>
          <div><strong>Total (manager):</strong> {totalSlp} slp</div>
        </React.Fragment>
      )}


    </div>
  )
}

export default Dashboard
