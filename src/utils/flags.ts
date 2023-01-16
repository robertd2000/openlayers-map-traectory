import { Feature } from 'ol'
import { Point } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import { useContext } from 'react'
import MapContext from '../context/mapContext'

export const setFlags = (startCoord: number[], endCoord: number[]) => {
  const { map } = useContext(MapContext)

  const startPoint = new Point(fromLonLat(startCoord))

  let startPointFeature = new Feature({
    geometry: startPoint,
  })

  const vectorSource = new VectorSource({
    features: [startPointFeature],
  })

  const startIconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://cdn-icons-png.flaticon.com/512/395/395841.png',
    }),
  })

  startPointFeature.setStyle(startIconStyle)

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: {
      'circle-radius': 3,
      'circle-fill-color': 'red',
    },
  })

  map.addLayer(vectorLayer)
  map.getView().fit(vectorSource.getExtent())

  return vectorLayer
}
