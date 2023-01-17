import { useContext } from 'react'
import { Feature } from 'ol'
import { Geometry, Point } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import Vector from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import MapContext from '../context/mapContext'
import { END_FLAG_ICON, START_FLAG_ICON } from '../utils/constants'

export const useFlags = () => {
  const { map } = useContext(MapContext)

  const setFlags = (
    startCoord: number[],
    endCoord: number[],
    currentLayer: Vector<VectorSource<Geometry>> | null
  ) => {
    map.removeLayer(currentLayer)

    const createFlag = (coords: number[], image: string) => {
      const point = new Point(fromLonLat(coords))
      let pointFeature = new Feature({
        geometry: point,
      })
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.96],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          width: 30,
          src: image,
        }),
      })
      pointFeature.setStyle(iconStyle)
      return pointFeature
    }

    const startFlag = createFlag(startCoord, START_FLAG_ICON)
    const endFlag = createFlag(endCoord, END_FLAG_ICON)

    const vectorSource = new VectorSource({
      features: [startFlag, endFlag],
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: {
        'circle-radius': 5,
        'circle-fill-color': 'red',
      },
    })

    map.addLayer(vectorLayer)

    return vectorLayer
  }

  return {
    setFlags,
  }
}
