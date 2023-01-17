import React from 'react'
import { Search } from './Search'
import { Route } from './Route'
import { useOverlay } from '../../hooks/useOverlay'
import { useRoute } from '../../hooks/useRoute'
import styles from './Routes.module.css'
import { useSearch } from '../../hooks/useSearch'

const Routes = () => {
  const { routes, chooseRoute, currentRouteId, resetRoute } = useRoute()
  const { overlayElement } = useOverlay()
  const { searchTerm, onSearch } = useSearch()

  return (
    <div className={styles.routes}>
      <Search searchTerm={searchTerm} onSearch={onSearch} />
      <span className={styles.close} onClick={resetRoute} />

      <div>
        {routes &&
          Array.isArray(routes) &&
          routes
            ?.filter((route) =>
              route.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            ?.map((route) => (
              <Route
                key={route?.id}
                route={route}
                currentRouteId={currentRouteId}
                chooseRoute={chooseRoute}
              />
            ))}
      </div>

      <div className={styles.popup} ref={overlayElement}></div>
    </div>
  )
}

export default Routes
