const WalletInformation = ({
  add = '',
  user = '',
  rate = 0,
  total = 0,
  start = 0,
  earnings = []
}) => ({
  add: String(add),
  user: String(user),
  rate: Number(rate),
  total: Number(total),
  start: Number(start),
  earnings: earnings.map(earning => Number(earning))
})

export default WalletInformation
