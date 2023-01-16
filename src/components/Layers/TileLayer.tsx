import { FC, useContext, useEffect } from 'react'
import OLTileLayer from 'ol/layer/Tile'
import MapContext from '../../context/mapContext'
import * as olSource from 'ol/source'

interface IProps {
  source: olSource.OSM
  zIndex: number
}

const TileLayer: FC<IProps> = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map) return

    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    })

    map.addLayer(tileLayer)
    tileLayer.setZIndex(zIndex)

    return () => {
      if (map) {
        map.removeLayer(tileLayer)
      }
    }
  }, [map])

  return null
}

export default TileLayer
