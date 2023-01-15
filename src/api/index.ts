import axios from 'axios'
import { IRoute, ITraectory } from '../types'
import { data } from '../utils/data'

const headers = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'accept-language': ' ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
  'cache-control': 'max-age=0',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
}

export const getRotes = async (): Promise<IRoute[]> => {
  // const reponse = await axios.get('https://janti.ru:5381/Main/GetRoutes', {
  //   headers,
  //   method: 'GET',
  // })
  // console.log(reponse)

  // const data = await reponse.data

  // return data
  return new Promise((resolve) =>
    resolve([
      { id: 1, name: 'Маршрут 1', color: '#6A5ACD' },
      { id: 2, name: 'Маршрут 2', color: '#32CD32' },
      { id: 3, name: 'Маршрут 3', color: '#CD5C5C' },
      { id: 4, name: 'Пустой маршрут', color: '#C71585' },
      { id: 5, name: 'Данные не найдены (ошибка)', color: '#00CDCD' },
    ])
  )
}

export const getRouteTraectory = async (
  routeId: number
): Promise<ITraectory[] | string> => {
  return new Promise((resolve) => resolve(data[routeId - 1]))
  // const reponse = await fetch(
  //   `https://janti.ru:5381/Main/GetRouteData?id=${routeId}`
  // )
  // const data = await reponse.json()
  // return data
}
