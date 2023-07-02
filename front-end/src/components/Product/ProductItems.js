import ProductItem from "./ProductItem";

const ProductItems = (props) => {

    return props.products.map((product) => {
        return <ProductItem product={product} key={product._id}/>
    })
}
export default ProductItems;