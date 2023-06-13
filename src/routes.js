import { useContext } from 'react';
import { Navigate, useRoutes , useLocation,useNavigate} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import WishlistPage from './pages/WishlistPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SingleProductPage from './pages/SingleProductPage';
import Cartlist from './pages/CartlistPage';
import { MainContext } from './context/MainContext';


// ----------------------------------------------------------------------

export default function Router() {
  const {mainState} = useContext(MainContext)
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'wishlist', element: <WishlistPage /> },
        {
          path: 'cart',
          element: mainState.isLoggedIn ? (
            <Cartlist />
          ) : (
            <Navigate to="/login" />
          ),
        },
        { path: 'singleProduct/:id', element: <SingleProductPage /> },
        
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
