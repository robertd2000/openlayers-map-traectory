import './App.css'
import MapComponent from './components/Map/Map'
import TileLayer from './components/Layers/TileLayer'
import osm from './utils/osm'
import { fromLonLat } from 'ol/proj'
import Routes from './components/Routes/Routes'

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
