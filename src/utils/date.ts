export const formatdate = (timestamp: number) => {
  const d = new Date()
  const dformat =
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(':') +
    ' ' +
    [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/')
  return dformat
}
