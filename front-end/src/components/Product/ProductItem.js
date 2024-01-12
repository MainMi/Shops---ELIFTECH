import { useDispatch } from "react-redux";
import classes from "./ProductItem.module.css"
import { cardAction } from "../../store/cart-slice";
import { uiAction, uiConstantIsVisible } from "../../store/ui-slice";

const ProductItem = (props) => {
    const { name, description, price, _id } = props.product;
    const dispatch = useDispatch();

    const addCartHandler = () => {
        dispatch(uiAction.toggle(uiConstantIsVisible.animateCard));
        setTimeout(() => dispatch(uiAction.toggle(uiConstantIsVisible.animateCard)), 250)
        dispatch(cardAction.addItemsToCart({name, price, id: _id}))
    }
    return <div className={classes.productBox}>
        <h2 className={classes.title}>{name}</h2>
        <p>{description}</p>
        <div className={classes.priceBox}>
            <button className={classes.addBtn} onClick={addCartHandler}>{price}$</button>
        </div>
    </div>
}

export default ProductItem;