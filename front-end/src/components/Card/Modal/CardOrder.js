import Modal from '../../UI/Modal'
import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';
import CardItem from '../CardItem';
import classes from './CardOrder.module.css'
import { useDispatch, useSelector } from 'react-redux';



const CardItems = (props) => {
    const dispath = useDispatch();
    const isHiddenCart = () => dispath(uiAction.toggle());
    const isVisibleForm = () => dispath(uiAction.toggle(uiConstantIsVisible.formOrderIsVisible));
    const { items, totalPrice } = useSelector(state => state.card);
    return <Modal onHiddenCart={isHiddenCart}>
        <div className={classes.content}>
            <div className={classes.itemBox}>
                {!!items.length ? items.map(value => <CardItem key={value.id} product={value} />) : <p>Items is null</p>}
            </div>
            <div className={classes.totalBox}>
                <div className={classes.priceBox}>
                    <h2>Total:</h2>
                    <span className={classes.totalPrice}>{totalPrice} $</span>
                </div>
                <div className={classes.buttonBox}>
                    <button onClick={isHiddenCart} className={classes.btn}>Close</button>
                    <button className={classes.btn} onClick={() => {
                        isHiddenCart();
                        isVisibleForm();
                    }} disabled={!items.length}>Order</button>
                </div>
            </div>
        </div>
    </Modal>
}


export default CardItems;