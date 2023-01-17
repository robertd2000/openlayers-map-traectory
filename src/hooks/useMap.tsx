import { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map.js'
import View from 'ol/View'
import { ZoomSlider } from 'ol/control.js'

export const useMap = (center: number[], zoom: number) => {
  const mapRef = useRef<HTMLDivElement>(null)
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
    map.setTarget(mapRef.current || '')
    const zoomslider = new ZoomSlider()
    map.addControl(zoomslider)
    setMap(map)

    return () => map.setTarget(undefined)
  }, [])

  return {
    map,
    mapRef,
    view,
  }
}
