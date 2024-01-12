import { useCookies } from 'react-cookie'
import { nanoid } from 'nanoid'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import ShopPage from './page/ShopPage';
import HomePage from './page/HomePage';
import RootLayout from './page/RootPage';
import SingPage from './page/SingPage';
import ProfilePage from './page/ProfilePage';
import ManagePage from './page/ManagePage';



function App() {

  const [ cookies, setCookie ] = useCookies(['uuid-user']);

  if (!cookies['uuid-user']) {
    setCookie( 'uuid-user', nanoid() );
  }


  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/product', element: <ShopPage/> },
        { path: '/sing' , element: <SingPage/> },
        { path: '/profile' , element: <ProfilePage/> },
        { path: '/manage', element: <ManagePage/> }
      ]
    }
    
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
