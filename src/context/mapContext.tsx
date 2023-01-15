import { createContext, FC, ProviderProps } from 'react'
import React from 'react'
import Map from 'ol/Map.js'
import { useMap } from '../hooks/useMap'
const MapContext = createContext<
  IntrinsicAttributes & ProviderProps<Map | null>
>(null)
interface IProps {
  zoom: number
  center: number[]
  children: React.ReactNode
}
export const MapContextProvider: FC<IProps> = ({ children, zoom, center }) => {
  const { map, mapRef, view } = useMap(center, zoom)

  return (
    <MapContext.Provider value={{ map, view }}>
      <div ref={mapRef} className="map">
        {children}
      </div>
    </MapContext.Provider>
  )
}

export default MapContext
