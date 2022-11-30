import Home from '../pages/Home';
import UserRole from '../pages/UserRole';
import Permission from '../pages/Permission';
import UserList from '../pages/UserList';
import Login from '../pages/Login';
import Layoutpage from '../pages/Layoutpage';
import PageNotFind from '../pages/PageNotFind';
import { Navigate } from 'react-router-dom';
import AddNews from '../pages/AddNews';
function RequireAuth({ children }) {
  const authed = localStorage.getItem('token');
  return authed === null ? (
    <Navigate to="/login" replace /> // 跳转到登录
  ) : (
    children
  );
}
const routesList = [
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layoutpage />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        index: true,
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
      {
        path: '/news-manage/add',
        element: <AddNews />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/pageNo',
    element: <PageNotFind />,
  },
];
export default routesList;
