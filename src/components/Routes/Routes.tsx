import React from 'react'
import { useOverlay } from '../../hooks/useOverlay'
import { useRoute } from '../../hooks/useRoute'
import { Search } from './Search'
import styles from './Routes.module.css'
import { Route } from './Route'

const Routes = () => {
  const { routes, chooseRoute, currentRouteId, resetRoute } = useRoute()
  const { element } = useOverlay()

  return (
    <div className={styles.routes}>
      <span className={styles.close} onClick={resetRoute} />
      <Search />
      {routes &&
        Array.isArray(routes) &&
        routes?.map((route) => (
          <Route
            key={route.id}
            route={route}
            currentRouteId={currentRouteId}
            chooseRoute={chooseRoute}
          />
        ))}
      <div className={styles.popup} ref={element}></div>
    </div>
  )
}

export default Routes
