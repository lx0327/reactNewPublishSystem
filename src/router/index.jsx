import Home from '../pages/Home'
import UserRole from '../pages/UserRole'
import Permission from '../pages/Permission'
import UserList from '../pages/UserList'

const routesList = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/right-manage/role/list',
    element: <UserRole />,
  },

  {
    path: '/right-manage/right/list',
    element: <Permission />,
  },
  {
    path: '/user-manage/list',
    element: <UserList />,
  },
]
export default routesList
