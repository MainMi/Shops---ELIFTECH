import { useDispatch } from "react-redux";
import classes from "./CardItem.module.css"
import { cardAction } from "../../store/cart-slice";

const CardItem = (props) => {
    const { name, description, price, id, qualitity } = props.product;
    const dispatch = useDispatch();

    const addCartHandler = () => {
        dispatch(cardAction.addItemsToCart({name, price, id }))
    }

    const deleteCartHandler = () => {
        dispatch(cardAction.removeItemsToCart(id))
    }

    return <div className={classes.cardBox}>
        <h2 className={classes.title}>{name}</h2>
        <p>{description}</p>
        <div className={classes.priceBox}>
            <span className={classes.price}>$ {price * qualitity}</span>
            <div className={classes.buttonBox}>
                <div className={classes.btn} onClick={addCartHandler}>+</div>
                <div>{qualitity}</div>
                <div className={classes.btn} onClick={deleteCartHandler}>-</div>
            </div>
        </div>
    </div>
}

export default CardItem;