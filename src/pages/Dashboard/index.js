import React, { useState, useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom"

import axios from 'axios'
import { Line } from 'react-chartjs-2'

import {
  BASE_UNIT_OPTIONS_CONSTANTS,
  MODAL_OPTIONS_CONSTANTS,
  USERS,
} from './Constants'

import WalletInformation from 'shared/model/WalletInformation'

import { StyledTableRow } from './StyledComponents'

// const state = {
//   labels: ['January', 'February', 'March',
//            'April', 'May'],
//   datasets: [
//     {
//       label: 'total',
//       fill: true,
//       lineTension: 0.5,
//       backgroundColor: 'rgba(75, 192, 192, .3)',
//       borderColor: 'rgba(0, 0, 0, 1)',
//       borderWidth: 2,
//       data: [65, 59, 80, 81, 56]
//     },
//     // {
//     //   label: 'diff',
//     //   fill: true,
//     //   lineTension: 0.5,
//     //   backgroundColor: 'rgba(32, 192, 5, .3)',
//     //   borderColor: 'rgba(0, 0, 0, 1)',
//     //   borderWidth: 2,
//     //   data: [10, 15, 80, 81, 56]
//     // },
//   ]
// }

const Dashboard = () => {
  // const dispatch = useDispatch()
  const { search } = useLocation()

  const queries = new URLSearchParams(search)
  const user = queries.get('user')

  const [totalSlp, setTotalSlp] = useState(0)
  const [finalResult, setFinalResult] = useState([])
  const [ccToUSD, setCcToUSD] = useState({})

  const [baseUnit, setBaseUnit] = useState(BASE_UNIT_OPTIONS_CONSTANTS.SLP)
  const [baseUnitNumeric, setBaseUnitNumeric] = useState(1)
  const [baseUnitRounder, setBaseUnitRounder] = useState(10)

  const [modalMode, setModalMode] = useState(MODAL_OPTIONS_CONSTANTS.ADD)
  const [rowInformation, setRowInformation] = useState(WalletInformation({}))

  const modalRef = useRef()
  
  useEffect(() => {
    fetchData()

    return () => {}
  }, [])

  const fetchData = async () => {
    try {
      if (user === 'mock') {
        setFinalResult([
          {
            add: '0xa06775d35109ebb35ad97f79984bc338f9eb5cc5',
            user: 'mock',
            rate: 1,
            start: 1001,
            total: 1076,
            earnings: [548, 680, 842, 1001],
          },
        ])

        return
      }

      const apiData = await (await axios.get('/api/daily/fetch')).data.response.data
      const { wallets, managerTotal } = apiData

      if (user === 'manager') {
        setTotalSlp(managerTotal)
        setFinalResult([ ...wallets ])
      } else if (USERS.includes(user)) {
        const scholarWallet = wallets.filter(wallet => wallet.user === user)
        setFinalResult([ ...scholarWallet ])
      }

      const coinPrices = await axios.get('/api/coins/all')

      setCcToUSD({ ...coinPrices.data.response.data })
    } catch (e) {
      console.error(e)
    }
  }

  const renderRowInformationModal = (indexOfInterest) => {
    setModalMode(MODAL_OPTIONS_CONSTANTS.DETAILS)
    setRowInformation(WalletInformation(finalResult[indexOfInterest]))
    modalRef.current.click()
  }

  const renderAddModal = () => {
    setModalMode(MODAL_OPTIONS_CONSTANTS.ADD)
  }

  const computeDateForLabels = lengthOfData => {
    if (!lengthOfData) return []

    const today = new Date()
    let dateLabels = []
    let dateToInsert = ''

    for (let i = 0; i <= lengthOfData; i++) {
      dateToInsert = new Date(today - (lengthOfData - i) * 24 * 3600 * 1000).toUTCString()
      dateToInsert = dateToInsert.split(' ')
      dateToInsert = `${dateToInsert[2]} ${dateToInsert[1]}` 

      dateLabels.push(dateToInsert)
    }

    return dateLabels
  }

  if (user !== 'manager' && !USERS.includes(user) && user !== 'mock') {
    return (
      <div
        style={{
          display: 'flex',
          height: '70vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        403: FORBIDDEN
      </div>
    ) 
  }

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
          minWidth: 373,
        }}
      >
        <h4 className="mt-2">
          Dashboard
        </h4>
        {user === 'manager' && (
          <React.Fragment>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ borderRadius: '50%' }}
              onClick={renderAddModal}
            >
              +
            </button>
            <br />
          </React.Fragment>
        )}

        {finalResult.length === 1 && (
          <Line
            data={{
              labels: computeDateForLabels(finalResult[0].earnings.length) || [],
              datasets: [
                {
                  label: 'total',
                  fill: true,
                  lineTension: 0.5,
                  backgroundColor: 'rgba(75, 192, 192, .3)',
                  borderColor: 'rgba(0, 0, 0, 1)',
                  borderWidth: 2,
                  data: [ ...finalResult[0].earnings, finalResult[0].total ] || [],
                }
              ]
            }}
            options={{
              plugins: {
                title:{
                  display: true,
                  text: 'SLP earnings for past 14 days',
                  fontSize: 20
                },
                legend:{
                  display: true,
                  // position: 'right'
                },
              },
            }}
          />
        )}

        <div><strong>ETH:</strong> ${ccToUSD.eth}</div>
        <div><strong>SLP:</strong> ${ccToUSD.slp}</div>

        {user === 'manager' && (
          <React.Fragment>
            <br />
            <div>
              <strong>Total (manager):</strong>
              &nbsp;{totalSlp} slp |
              &nbsp;${Math.round(totalSlp * ccToUSD.slp * 100) / 100} |
              &nbsp;{Math.round(totalSlp * ccToUSD.slp / ccToUSD.eth * 100000) / 100000} eth
            </div>
          </React.Fragment>
        )}

        <div className="btn-group" role="group" aria-label="Radio toggle for basic unit of table">
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="val-slp"
            autocomplete="off"
            checked={baseUnit === BASE_UNIT_OPTIONS_CONSTANTS.SLP}
            onClick={() => {
              setBaseUnit(BASE_UNIT_OPTIONS_CONSTANTS.SLP)
              setBaseUnitNumeric(1)
              setBaseUnitRounder(10)
            }}
          />
          <label
            className="btn btn-outline-primary" for="val-slp"
            style={{ boxShadow: 'none' }}
          >
            SLP
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="val-usd"
            autocomplete="off"
            checked={baseUnit === BASE_UNIT_OPTIONS_CONSTANTS.USD}
            onClick={() => {
              setBaseUnit(BASE_UNIT_OPTIONS_CONSTANTS.USD)
              setBaseUnitNumeric(ccToUSD.slp)
              setBaseUnitRounder(100)
            }}
          />
          <label
            className="btn btn-outline-primary" for="val-usd"
            style={{ boxShadow: 'none' }}
          >
            USD
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="val-eth"
            autocomplete="off"
            checked={baseUnit === BASE_UNIT_OPTIONS_CONSTANTS.ETH}
            onClick={() => {
              setBaseUnit(BASE_UNIT_OPTIONS_CONSTANTS.ETH)
              setBaseUnitNumeric(ccToUSD.slp / ccToUSD.eth)
              setBaseUnitRounder(1000)
            }}
          />
          <label
            className="btn btn-outline-primary" for="val-eth"
            style={{ boxShadow: 'none' }}
          >
            ETH
          </label>
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
              <StyledTableRow
                key={`row-${i}`}
                onClick={() => renderRowInformationModal(i)}
              >
                <th scope="row"><strong>{r.user}</strong></th>
                <td style={{ textAlign: 'right' }}>
                  {Math.round(r.total * baseUnitNumeric * baseUnitRounder) / baseUnitRounder}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {Math.round((r.total - r.start) * baseUnitNumeric * baseUnitRounder) / baseUnitRounder}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {Math.round((r.total * r.rate) * baseUnitNumeric * baseUnitRounder) / baseUnitRounder}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {Math.round((r.total * (1 - r.rate)) * baseUnitNumeric * baseUnitRounder) / baseUnitRounder}
                </td>
                <td style={{ textAlign: 'center' }}>{r.rate * 100}%</td>
              </StyledTableRow>
            )) : (
              <tr>
                <td colSpan={100} style={{ textAlign: 'center' }}>
                  No Data
                  {user === 'manager' && (
                    <React.Fragment>
                      <br/>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={renderAddModal}
                      >
                        Add scholar
                      </button>
                    </React.Fragment>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          ref={modalRef}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ display: 'none' }}
        >
          ROW INFORMATION MODAL
        </button>
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
                  {modalMode === MODAL_OPTIONS_CONSTANTS.ADD && (
                    <React.Fragment>Add scholar</React.Fragment>
                  )}

                  {modalMode === MODAL_OPTIONS_CONSTANTS.DETAILS && (
                    <React.Fragment>Information on {rowInformation.user || ''}</React.Fragment>
                  )}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {modalMode === MODAL_OPTIONS_CONSTANTS.ADD && (
                  <React.Fragment>Coming soon...</React.Fragment>
                )}

                {modalMode === MODAL_OPTIONS_CONSTANTS.DETAILS && (
                  <React.Fragment>
                    <Line
                      data={{
                        labels: computeDateForLabels(rowInformation?.earnings.length) || [],
                        datasets: [
                          {
                            label: 'total',
                            fill: true,
                            lineTension: 0.5,
                            backgroundColor: 'rgba(75, 192, 192, .3)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            borderWidth: 2,
                            data: [ ...rowInformation?.earnings, rowInformation?.total ] || [],
                          }
                        ]
                      }}
                      options={{
                        plugins: {
                          title:{
                            display: true,
                            text: 'SLP earnings for past 14 days',
                            fontSize: 20
                          },
                          legend:{
                            display: true,
                            // position: 'right'
                          },
                        },
                      }}
                    />

                    <ul>
                      {/* <li>Rate: {rowInformation.rate}</li> */}
                      <li>Total: {rowInformation.total}</li>
                      <li>
                        History: [
                        {rowInformation?.earnings.map((earning, earningIndex) => {
                          return earningIndex === rowInformation.earnings.length - 1 ? earning : `${earning}, `
                        })}
                        ]
                      </li>
                    </ul>
                  </React.Fragment>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                {modalMode === MODAL_OPTIONS_CONSTANTS.ADD && (
                  <button
                    type="button"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
