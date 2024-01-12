import { NavLink, useLocation } from 'react-router-dom';
import classes from './Header.module.css'
import HeaderButton from "./HeaderButton";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../store/actions/auth-actions';
import { authAction } from '../../store/auth-slice';

const Header = () => {
    const [ isButton, setIsButton ] = useState(false);
    const navLinkHeader = ({ isActive }) => {
        return isActive ? classes.active : undefined;
    }

    const location = useLocation();

    const userToken = useSelector((state) => state.auth.userToken);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();
    const singOutHandler = () => {
        const isExit = window.confirm('Do you really wand sing out?');
        if (!isExit) {
            return;
        }
        dispatch(authAction.logOutAuth());
    }
    useEffect(() => {
        setIsButton(location.pathname === '/product');
        dispatch(fetchUserInfo());
    }, [location]);

    return <header className={classes.header}>
        <h2 className={classes.title}>Market Shops</h2>
        <nav className={classes.navigation}>
            <h4><NavLink to="/" className={classes.homeTitle}>Home</NavLink></h4>
            {userToken && userInfo.role === 'manager' && <h4><NavLink to="/manage" className={`${classes.managerTitle} ${navLinkHeader}`}>Manager</NavLink></h4>}
            {userToken && <h4><NavLink to="/profile" className={classes.profileTitle}>Profile</NavLink></h4>}
            {!userToken && <h4><NavLink to="/sing?mode=singIn" className={navLinkHeader}>Sing up/Sing in</NavLink></h4>}
            {userToken && <h4 className={classes.singOutBtn} onClick={singOutHandler}>Sing out</h4>}
            <h4><NavLink to="/product" className={`${classes.shopTitle} ${navLinkHeader}`}>Shop</NavLink></h4>
            {isButton && <HeaderButton/>}
        </nav>
    </header>
} 

export default Header;