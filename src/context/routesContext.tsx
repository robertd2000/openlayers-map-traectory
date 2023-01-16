import VectorSource from 'ol/source/Vector'
import React, { createContext, useEffect, useState } from 'react'
import { Vector } from 'ol/layer'

import { IRoute, ITraectory } from '../types'
import { Geometry } from 'ol/geom'
import { getRoutes } from '../api'

const RouteContext = createContext(null)

export const routesContext = () => {
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

  return (
    <RouteContext.Provider
      value={{
        routes,
        currentRoute,
        currentRouteId,
        currentTraectoryLayer,
        currentTraectoryLineLayer,
        currentFlagLayer,
        setRoutes,
        setCurrentRoute,
        setCurrentRouteId,
        setCurrentTraectoryLayer,
        setCurrentTraectoryLineLayer,
        setCurrentFlagLayer,
      }}
    >
      routesContext
    </RouteContext.Provider>
  )
}
