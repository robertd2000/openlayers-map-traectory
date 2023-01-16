import { Geometry } from 'ol/geom'
import { Vector } from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import { useContext, useEffect, useState } from 'react'
import { getRotes, getRouteTraectory } from '../api'
import MapContext from '../context/mapContext'
import { IRoute, ITraectory } from '../types'
import { useTraectory } from './useTraectory'
import { useTraectoryLine } from './useTraectoryLine'

export const useRoute = () => {
  const { setRoute } = useTraectory()
  const { setRouteLine } = useTraectoryLine()
  const { map } = useContext(MapContext)

  const [routes, setRoutes] = useState<IRoute[] | string>([])
  const [currentRoute, setCurrentRoute] = useState<
    ITraectory[] | string | null
  >(null)
  const [currentRouteId, setCurrentRouteId] = useState<number | null>(null)
  const [currentTraectoryLayer, setCurrentTraectoryLayer] = useState<Vector<
    VectorSource<Geometry>
  > | null>(null)
  const [currentTraectoryLineLayer, setCurrentTraectoryLineLayer] =
    useState<Vector<VectorSource<Geometry>> | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRotes()
      setRoutes(data)
    }

    fetchData()

    return () => setCurrentRoute([])
  }, [])

  const resetRoute = () => {
    setCurrentRouteId(null)
    map.removeLayer(currentTraectoryLayer)
    map.removeLayer(currentTraectoryLineLayer)
  }

  const chooseRoute = async (routeId: number) => {
    const res = await getRouteTraectory(routeId)
    setCurrentRouteId(routeId)
    let color, coords
    if (Array.isArray(res)) {
      color = Array.isArray(routes) ? routes?.[routeId - 1]?.color : 'red'
      coords = res.map((r) => {
        return [r.lon, r.lat]
      })
      setRoute(res, color, currentTraectoryLayer, setCurrentTraectoryLayer)
      setRouteLine(
        coords,
        color,
        currentTraectoryLineLayer,
        setCurrentTraectoryLineLayer
      )
    } else {
      resetRoute()
    }

    setCurrentRoute(res)
  }

  return { routes, currentRoute, currentRouteId, chooseRoute, resetRoute }
}
