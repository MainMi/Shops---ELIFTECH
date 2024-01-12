import ProductItem from "./ProductItem";
import classes from "./ProductItems.module.css"
const ProductItems = (props) => {

    return <div className={classes.productGrid}>
        {props.products.map((product) => {
        return <ProductItem product={product} key={product._id}/>
    })}
    </div>
}
export default ProductItems;