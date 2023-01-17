import React, { useContext } from 'react'
import { Feature } from 'ol'
import { Geometry, Point } from 'ol/geom'
import { Vector, Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import { fromLonLat } from 'ol/proj'
import MapContext from '../context/mapContext'
import { ITraectory } from '../types'

export const useTraectoryPoint = () => {
  const { map } = useContext(MapContext)

  const setRoute = (
    coords: ITraectory[],
    color: string,
    currentLayer: Vector<VectorSource<Geometry>> | null
  ) => {
    map.removeLayer(currentLayer)
    let features: Feature<Geometry>[] = []

    coords.forEach((place) => {
      const point = new Point(fromLonLat([place.lon, place.lat]))
      let feature = new Feature({
        type: 'point',
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

    map.addLayer(vectorLayer)
    map.getView().fit(vectorSource.getExtent())
    return vectorLayer
  }

  return { setRoute }
}
