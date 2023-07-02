import CardOrder from '../Card/Modal/CardOrder';
import FormOrder from '../Card/Modal/FormOrder';
import ProductItems from '../Product/ProductItems';
import SearchItem from '../SearchItem/SearchItem'

import classes from './ShopPage.module.css'
import { useSelector } from 'react-redux';

const ShopPage = () => {
    const isVisibleCard = useSelector(state => state.ui.cartIsVisible);
    const isVisibleForm = useSelector(state => state.ui.formOrderIsVisible);
    const products = useSelector(state => state.product.items);
    return <div className={classes.content}>
        <SearchItem/>
        {!!products.length && <ProductItems products={products}/>}
        {isVisibleCard && <CardOrder/>}
        {isVisibleForm && <FormOrder items={products} />}
    </div>
}

export default ShopPage;