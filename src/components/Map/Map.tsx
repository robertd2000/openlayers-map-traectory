import React, { FC } from 'react'

import { MapContextProvider } from '../../context/mapContext'

interface IProps {
  zoom: number
  center: number[]
  children: React.ReactNode
}
const MapComponent: FC<IProps> = ({ children, zoom, center }) => {
  return (
    <MapContextProvider center={center} zoom={zoom}>
      {children}
    </MapContextProvider>
  )
}

export default MapComponent
