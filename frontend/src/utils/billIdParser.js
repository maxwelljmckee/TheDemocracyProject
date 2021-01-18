
export default (billId) => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const truncated = billId.split('-')[0].split('');
  const targetIdx = truncated.findIndex(el => digits.includes(el))
  
  let billType = truncated.slice(0, targetIdx).join('')
  const billNum = truncated.slice(targetIdx).join('')

  switch (billType) {
    case 'hr':
      billType = 'House Bill'
      break
    case 'hres':
      billType =
      billType = 'House Resolution'
      break
    case 'hconres':
      billType = 'House Concurrent Resolution'
      break
    case 'hjres':
      billType = 'House Joint Resolution'
      break
    case 's':
      billType = 'Senate Bill'
      break
    case 'sres':
      billType = 'Senate Resolution'
      break
    case 'sconres':
      billType = 'Senate Concurrent Resolution'
      break
    case 'sjres':
      billType = 'Senate Joint Resolution'
      break
    default:
      return
  }

  return [billType, billNum]
}
