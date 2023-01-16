import { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map.js'
import View from 'ol/View'

export const useMap = (center: number[], zoom: number) => {
  const mapRef = useRef<HTMLElement | undefined>()
  const [map, setMap] = useState<Map | null>(null)

  const view = new View({
    center,
    zoom,
  })

  useEffect(() => {
    const mapConfig = {
      layers: [],
      view,
    }
    let map = new Map(mapConfig)
    map.setTarget(mapRef.current)
    setMap(map)

    return () => map.setTarget(undefined)
  }, [])

  return {
    map,
    mapRef,
    view,
  }
}
