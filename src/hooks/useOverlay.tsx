import React, { useContext, useEffect, useRef } from 'react'
import { Overlay } from 'ol'
import MapContext from '../context/mapContext'
import { getMessage } from '../utils/format'

export const useOverlay = () => {
  const overlayElement = useRef<HTMLDivElement>(null)
  const { map } = useContext(MapContext)

  const mapClickHandler = (e: any, popup: Overlay) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, function (feature: any) {
      return feature
    })
    if (feature) {
      const coordinates = feature.getGeometry().getCoordinates()
      if (overlayElement?.current) {
        overlayElement.current.innerHTML = getMessage(feature, coordinates)
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
      element: overlayElement.current!,
      stopEvent: false,
    })

    map.addOverlay(popup)
    map.on('click', (e: any) => mapClickHandler(e, popup))
  })

  return { overlayElement }
}
