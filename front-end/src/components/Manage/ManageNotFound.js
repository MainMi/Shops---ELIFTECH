import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';
import classes from './ManageNotFound.module.css'

import { useDispatch } from 'react-redux';

const ManageNotFound = () => {
    const dispath = useDispatch();
    const modalHandler = () => dispath(uiAction.enable(
        uiConstantIsVisible.addStoreIsVisible
    ))
    return <div className={classes.content}>
        <h2>Sorry you dont have stores...</h2>
        <p>Occaecat ut pariatur id anim ea excepteur irure nisi officia excepteur non nostrud. Veniam id do ipsum commodo veniam est reprehenderit.</p>
        <button className={classes.btn} onClick={modalHandler}>Add Store</button>
    </div>
}

export default ManageNotFound;