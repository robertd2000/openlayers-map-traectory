import { Overlay } from 'ol'
import { fromLonLat, toLonLat } from 'ol/proj'
import React, { useContext, useEffect, useRef } from 'react'
import MapContext from '../context/mapContext'
import { formatdate } from '../utils/date'

export const useOverlay = () => {
  const element = useRef<HTMLElement | null>(null)
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map) return

    const popup = new Overlay({
      position: fromLonLat([-43.3307, -22.9201]),
      positioning: 'center-center',
      element: element.current!,
      stopEvent: false,
    })
    map.addOverlay(popup)

    map.on('click', function (evt: any) {
      const feature = map.forEachFeatureAtPixel(
        evt.pixel,
        function (feature: any) {
          return feature
        }
      )
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates()
        if (element?.current) {
          element.current.innerHTML =
            '<span> Скорость:</span>' +
            feature.get('speed') +
            '<hr>' +
            '<span>Дата:</span>' +
            formatdate(feature.get('time')) +
            '<hr>' +
            '<span> Направление:</span>' +
            feature.get('course') +
            '<span> Координаты:</span>' +
            coordinates
          popup.setPosition(coordinates)
        }
      } else {
        popup.setPosition(undefined)
      }
    })
  })

  return { element }
}
