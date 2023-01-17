import { fromLonLat } from 'ol/proj'
import MapComponent from './components/Map/Map'
import TileLayer from './components/Layers/TileLayer'
import Routes from './components/Routes/Routes'
import osm from './utils/osm'
import './App.css'

function App() {
  return (
    <div>
      <MapComponent center={fromLonLat([40, 50])} zoom={5}>
        <TileLayer source={osm()} zIndex={0} />
        <Routes />
      </MapComponent>
    </div>
  )
}

export default App
