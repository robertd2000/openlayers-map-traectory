export const formatdate = (timestamp: number) => {
  const d = new Date()
  const dformat =
    [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') +
    ' ' +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
  return dformat
}
