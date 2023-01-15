import React from 'react'
import { useRoute } from '../../hooks/useRoute'

const Routes = () => {
  const { routes, chooseRoute, currentRoute } = useRoute()
  console.log(routes)

  return (
    <div className="routes">
      {routes &&
        Array.isArray(routes) &&
        routes?.map((route) => (
          <div key={route.id} onClick={() => chooseRoute(route.id)}>
            {route.name}
          </div>
        ))}
    </div>
  )
}

export default Routes
