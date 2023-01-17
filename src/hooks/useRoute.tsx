import { useContext, useEffect, useState } from 'react'
import { Geometry } from 'ol/geom'
import { Vector } from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import { getRoutes, getRouteTraectory } from '../api'
import MapContext from '../context/mapContext'
import { getColor, getCoordinates } from '../utils/format'
import { useTraectoryPoint } from './useTraectoryPoint'
import { useTraectoryLine } from './useTraectoryLine'
import { useFlags } from './useFlags'
import { IRoute, ITraectory } from '../types'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'

export const useRoute = () => {
  const { setRoute } = useTraectoryPoint()
  const { setRouteLine } = useTraectoryLine()
  const { setFlags } = useFlags()
  const { map } = useContext(MapContext)

  const [routes, setRoutes] = useState<IRoute[]>([])
  const [currentRoute, setCurrentRoute] = useState<
    ITraectory[] | string | null
  >(null)
  const [currentRouteId, setCurrentRouteId] = useState<number | null>(null)
  const [currentTraectoryLayer, setCurrentTraectoryLayer] = useState<Vector<
    VectorSource<Geometry>
  > | null>(null)
  const [currentTraectoryLineLayer, setCurrentTraectoryLineLayer] =
    useState<Vector<VectorSource<Geometry>> | null>(null)
  const [currentFlagLayer, setCurrentFlagLayer] = useState<Vector<
    VectorSource<Geometry>
  > | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRoutes()
      setRoutes(data)
    }

    fetchData()

    return () => {
      setCurrentRoute([])
    }
  }, [currentRouteId])

  const resetRoute = () => {
    setCurrentRouteId(null)
    map.removeLayer(currentTraectoryLayer)
    map.removeLayer(currentTraectoryLineLayer)
    map.removeLayer(currentFlagLayer)
  }

  const chooseRoute = async (routeId: number) => {
    const res = await getRouteTraectory(routeId)
    setCurrentRouteId(routeId)
    let color, coords
    if (Array.isArray(res)) {
      color = getColor(routes, routeId)
      coords = getCoordinates(res)
      let currentTraectoryVectorLayer = setRoute(
        res,
        color,
        currentTraectoryLayer
      )
      let currentTraectoryLineVectorLayer = setRouteLine(
        coords,
        color,
        currentTraectoryLineLayer
      )

      let flagLayer = setFlags(
        coords[0],
        coords[coords.length - 1],
        currentFlagLayer
      )

      setCurrentTraectoryLayer(currentTraectoryVectorLayer)
      setCurrentTraectoryLineLayer(currentTraectoryLineVectorLayer)
      setCurrentFlagLayer(flagLayer)
    } else {
      resetRoute()
    }

    setCurrentRoute(res)
  }

  return {
    routes,
    currentRoute,
    currentRouteId,
    chooseRoute,
    resetRoute,
  }
}
