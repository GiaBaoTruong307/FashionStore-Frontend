import { Routes, Route } from 'react-router-dom'
import { routes } from './index'

interface RouteChild {
  path: string
  element: React.ComponentType
  index?: boolean
  label?: string
  hidden?: boolean
  private?: boolean
}

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(
        (route) =>
          route.component && (
            <Route key={route.path} element={<route.component />}>
              {route.children?.map((child: RouteChild) =>
                child.index ? (
                  <Route key="index" index element={<child.element />} />
                ) : (
                  <Route key={child.path} path={child.path} element={<child.element />} />
                )
              )}
            </Route>
          )
      )}
    </Routes>
  )
}

export default AppRouter
