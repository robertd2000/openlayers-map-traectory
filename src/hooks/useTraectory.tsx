import { Feature, Overlay } from 'ol'
import { Geometry, Point } from 'ol/geom'
import React, { useContext, useRef, useState } from 'react'
import { Vector, Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import MapContext from '../context/mapContext'
import { fromLonLat } from 'ol/proj'

export const useTraectory = () => {
  const { map, view } = useContext(MapContext)
  const [currentLayer, setCurrentLayer] = useState<Vector<
    VectorSource<Geometry>
  > | null>(null)
  const setRoute = (coords: number[][], color: string) => {
    map.removeLayer(currentLayer)
    let features: Feature<Point>[] = []

    let prevPoint: Point
    coords.forEach((place) => {
      const point = new Point(fromLonLat([place[0], place[1]]))
      let feature = new Feature({
        geometry: point,
      })

      features.push(feature)
      prevPoint = point
    })

    const vectorSource = new VectorSource({
      features,
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: {
        'circle-radius': 3,
        'circle-fill-color': color,
      },
    })

    setCurrentLayer(vectorLayer)
    map.addLayer(vectorLayer)

    const size = map.getSize()
    console.log('coords', view)

    view.centerOn(coords[0], size, [570, 500])
    view.setZoom(9)
  }

  return { setRoute }
}
