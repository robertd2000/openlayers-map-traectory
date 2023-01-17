import { useContext } from 'react'
import lineString from 'turf-linestring'
import Vector from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import { Geometry } from 'ol/geom'
import MapContext from '../context/mapContext'

export const useTraectoryLine = () => {
  const { map } = useContext(MapContext)

  const setRouteLine = (
    coords: number[][],
    color: string,
    currentLayer: Vector<VectorSource<Geometry>> | null
  ) => {
    map.removeLayer(currentLayer)

    let line = new lineString(coords)
    let format = new GeoJSON()

    let feature = format.readFeature(line, {
      featureProjection: 'EPSG:3857',
    })

    let vectorSource = new VectorSource()
    vectorSource.addFeature(feature)
    let vectorLayer = new Vector({
      source: vectorSource,
      style: [
        new Style({
          stroke: new Stroke({
            color: color,
            width: 2,
          }),
        }),
      ],
    })

    map.addLayer(vectorLayer)
    return vectorLayer
  }

  return {
    setRouteLine,
  }
}
