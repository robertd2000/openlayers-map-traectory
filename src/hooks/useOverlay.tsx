import { Overlay } from 'ol'
import React, { useContext, useEffect } from 'react'
import MapContext from '../context/mapContext'
import { formatCoordinate } from '../utils/format'

export const useOverlay = () => {
  const { map } = useContext(MapContext)
  useEffect(() => {
    const element = document.getElementById('popup')

    const popup = new Overlay({
      element: element!,
      stopEvent: false,
    })
    map.addOverlay(popup)

    let popover
    map.on('click', function (event) {
      if (popover) {
        popover.dispose()
        popover = undefined
      }
      const feature = map.getFeaturesAtPixel(event.pixel)[0]
      if (!feature) {
        return
      }
      const coordinate = feature.getGeometry().getCoordinates()
      popup.setPosition([
        coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
        coordinate[1],
      ])
    })

    popover = new bootstrap.Popover(element, {
      container: element.parentElement,
      content: formatCoordinate(coordinate),
      html: true,
      offset: [0, 20],
      placement: 'top',
      sanitize: false,
    })
    popover.show()

    map.on('pointermove', function (event) {
      const type = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit'
      map.getViewport().style.cursor = type
    })
  })

  return {}
}
