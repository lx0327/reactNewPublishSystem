
import { useRoutes } from 'react-router-dom'
import routesList from './router'
function App () {

  const element = useRoutes(routesList)
  return (
    <>
      {element}
    </>

  )
}
export default App

