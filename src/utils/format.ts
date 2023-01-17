import { IRoute, ITraectory } from '../types'
import { formatdate } from './date'

export const formatCoordinate = (coordinate: number[]) => {
  return `
      <table>
        <tbody>
          <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
          <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
        </tbody>
      </table>`
}

export const getMessage = (feature: any, coordinates: number[]) => {
  return (
    '<span> Скорость: </span>' +
    (feature.get('speed') || 'Нет данных') +
    '<hr>' +
    '<span>Дата: </span>' +
    formatdate(feature.get('time')) +
    '<hr>' +
    '<span> Направление: </span>' +
    (feature.get('course') || 'Нет данных') +
    '<hr>' +
    '<span> Координаты: </span>' +
    (coordinates || 'Нет данных')
  )
}

export const getColor = (routes: IRoute[], routeId: number) => {
  return Array.isArray(routes) ? routes?.[routeId - 1]?.color : 'red'
}

export const getCoordinates = (traectoryArr: ITraectory[]) => {
  return traectoryArr.map((r) => {
    return [r.lon, r.lat]
  })
}
