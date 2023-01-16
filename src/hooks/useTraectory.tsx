import { Feature } from 'ol'
import { Geometry, Point } from 'ol/geom'
import React, { useContext } from 'react'
import { Vector, Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import MapContext from '../context/mapContext'
import { fromLonLat } from 'ol/proj'
import { ITraectory } from '../types'

export const useTraectory = () => {
  const { map } = useContext(MapContext)

  const setRoute = (
    coords: ITraectory[],
    color: string,
    currentLayer: Vector<VectorSource<Geometry>> | null,
    setCurrentLayer: React.Dispatch<
      React.SetStateAction<Vector<VectorSource<Geometry>> | null>
    >
  ) => {
    map.removeLayer(currentLayer)
    let features: Feature<Point>[] = []

    coords.forEach((place) => {
      const point = new Point(fromLonLat([place.lon, place.lat]))
      let feature = new Feature({
        geometry: point,
        speed: place.speed,
        time: place.time,
        course: place.course,
      })

      features.push(feature)
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
    map.getView().fit(vectorSource.getExtent())
  }

  return { setRoute }
}
