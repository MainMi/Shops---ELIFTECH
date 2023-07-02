import classes from './Header.module.css'
import HeaderButton from "./HeaderButton";

const Header = () => {
    return <header className={classes.header}>
        <h2 className={classes.title}>Food Shop</h2>
        <HeaderButton/>
    </header>
} 

export default Header;