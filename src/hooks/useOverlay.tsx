import { Overlay } from 'ol'
import React, { useContext, useEffect, useRef } from 'react'
import MapContext from '../context/mapContext'
import { formatdate } from '../utils/date'
import { getMessage } from '../utils/format'

export const useOverlay = () => {
  const element = useRef<HTMLElement | null>(null)
  const { map } = useContext(MapContext)

  const mapClickHandler = (evt: any, popup: Overlay) => {
    const feature = map.forEachFeatureAtPixel(
      evt.pixel,
      function (feature: any) {
        return feature
      }
    )
    if (feature) {
      const coordinates = feature.getGeometry().getCoordinates()
      if (element?.current) {
        element.current.innerHTML = getMessage(feature, coordinates)
        popup.setPosition(coordinates)
      }
    } else {
      popup.setPosition(undefined)
    }
  }

  useEffect(() => {
    if (!map) return

    const popup = new Overlay({
      positioning: 'center-center',
      element: element.current!,
      stopEvent: false,
    })

    map.addOverlay(popup)
    map.on('click', (e: any) => mapClickHandler(e, popup))
  })

  return { element }
}
