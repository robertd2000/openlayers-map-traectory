export const formatdate = (timestamp: number) => {
  const d = new Date(timestamp * 1000)
  const timeFormat = [d.getUTCHours(), d.getMinutes(), d.getSeconds()]
  const dateFormat = [d.getDate(), d.getMonth() + 1, d.getFullYear()]
  const dformat =
    (timeFormat.every((date) => !isNaN(date))
      ? timeFormat.join(':')
      : 'Нет данных') +
    ' ' +
    (dateFormat.every((date) => !isNaN(date))
      ? dateFormat.join('/')
      : '/Нет данных')
  return dformat
}
