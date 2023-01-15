import { useContext, useEffect, useState } from 'react'
import { getRotes, getRouteTraectory } from '../api'
import MapContext from '../context/mapContext'
import { IRoute, ITraectory } from '../types'
import { useTraectory } from './useTraectory'
import { useTraectoryLine } from './useTraectoryLine'

export const useRoute = () => {
  const { map } = useContext(MapContext)
  const { setRoute } = useTraectory()
  const { setRouteLine } = useTraectoryLine()

  const [routes, setRoutes] = useState<IRoute[] | string>([])
  const [currentRoute, setCurrentRoute] = useState<
    ITraectory[] | string | null
  >(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRotes()
      setRoutes(data)
    }

    fetchData()

    return () => setCurrentRoute([])
  }, [])

  const chooseRoute = async (routeId: number) => {
    const res = await getRouteTraectory(routeId)

    if (Array.isArray(res)) {
      const color = Array.isArray(routes) ? routes?.[routeId - 1]?.color : 'red'
      const coords = res.map((r) => {
        return [r.lon, r.lat]
      })
      setRoute(coords, color)
      setRouteLine(coords, color)
    }

    setCurrentRoute(res)
  }

  return { routes, currentRoute, chooseRoute }
}
