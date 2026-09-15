import { Routes, Route } from 'react-router-dom'
import { routes } from './index'
import PrivateRoute from '../components/routes/PrivateRoute'
import AdminRoute from '../components/routes/AdminRoute'

interface RouteChild {
  path: string
  element: React.ComponentType
  index?: boolean
  label?: string
  hidden?: boolean
  private?: boolean
}

interface RouteGroup {
  path: string
  component: React.ComponentType
  guard?: 'admin'
  children?: RouteChild[]
}

const AppRouter = () => {
  return (
    <Routes>
      {(routes as RouteGroup[]).map((route) => {
        if (!route.component) return null

        const layoutElement =
          route.guard === 'admin' ? (
            <AdminRoute>
              <route.component />
            </AdminRoute>
          ) : (
            <route.component />
          )

        return (
          <Route
            key={route.path}
            path={route.guard === 'admin' ? route.path : undefined}
            element={layoutElement}
          >
            {route.children?.map((child) => {
              const element = child.private ? (
                <PrivateRoute>
                  <child.element />
                </PrivateRoute>
              ) : (
                <child.element />
              )

              return child.index ? (
                <Route key="index" index element={element} />
              ) : (
                <Route key={child.path} path={child.path} element={element} />
              )
            })}
          </Route>
        )
      })}
    </Routes>
  )
}

export default AppRouter
