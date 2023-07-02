import { useEffect } from 'react';
import Header from './components/Layout/header/Header';
import ShopPage from './components/page/ShopPage';
import { useDispatch } from 'react-redux';
import { fetchShops } from './components/store/actions/shop-actions';
import NotificationStatus from './components/Notification/Notification-status';
import { useCookies } from 'react-cookie'
import { nanoid } from 'nanoid'


function App() {

  const [ cookies, setCookie ] = useCookies(['uuid-user']);

  if (!cookies['uuid-user']) {
    setCookie( 'uuid-user', nanoid() );
  }


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShops()); 
  }, []);

  return (
    <div>
      <NotificationStatus/>
      <Header/>
      <ShopPage/>
    </div>
  );
}

export default App;
