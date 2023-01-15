import lineString from 'turf-linestring'
import Vector from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import { GeoJSON } from 'ol/format'
import { useContext, useState } from 'react'
import MapContext from '../context/mapContext'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import { Geometry } from 'ol/geom'

export const useTraectoryLine = () => {
  const [currentLayer, setCurrentLayer] = useState<Vector<
    VectorSource<Geometry>
  > | null>(null)

  const { map } = useContext(MapContext)

  const setRouteLine = (coords: number[][], color: string) => {
    map.removeLayer(currentLayer)

    let line = new lineString(coords)
    let format = new GeoJSON()

    let vectorSource = new VectorSource()
    let feature = format.readFeature(line, {
      featureProjection: 'EPSG:3857',
    })

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
    setCurrentLayer(vectorLayer)

    map.addLayer(vectorLayer)
  }

  return {
    setRouteLine,
  }
}
