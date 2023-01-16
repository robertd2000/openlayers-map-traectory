import React, { FC } from 'react'
import { IRoute } from '../../types'
import styles from './Route.module.css'

interface IProps {
  route: IRoute
  currentRouteId: number | null
  chooseRoute: (routeId: number) => Promise<void>
}

export const Route: FC<IProps> = ({ route, currentRouteId, chooseRoute }) => {
  return (
    <div className={styles.route} onClick={() => chooseRoute(route.id)}>
      <div
        className={styles['route-info']}
        style={{
          color: currentRouteId === route.id ? route.color : 'black',
          fontSize: currentRouteId === route.id ? '22px' : '18px',
        }}
      >
        <div>{route.name}</div>
        <div>
          <span
            style={{ borderColor: route.color }}
            className={styles['arrow-right']}
          ></span>
        </div>
      </div>

      <hr
        style={{
          color: route.color,
        }}
      />
    </div>
  )
}
