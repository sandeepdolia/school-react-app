export const getArrow = (asc = true) => {
  if (asc)
    return (<span>▴</span>)
  else
    return (<span>▾</span>)
}

 export const sortData = (data, colName, asc = true) => {
  data.sort((a, b) => {
    a = a[colName]
    b = b[colName]

    if (!a || !b) return -1

    if (typeof a === 'string') a = a.toLowerCase()
    if (typeof b === 'string') b = b.toLowerCase()

    if (asc) {
      if (a > b) return 1
      if (a < b) return -1
    } else {
      if (a < b) return 1
      if (a > b) return -1
    }
    return 0
  })
}