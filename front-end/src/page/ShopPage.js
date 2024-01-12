import { useEffect } from 'react';
import CardOrder from '../components/Modal/CardOrder';
import FormOrder from '../components/Modal/FormOrder';
import ProductItems from '../components/Product/ProductItems';
import SearchItem from '../components/SearchItem/SearchItem'
import classes from './ShopPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../store/actions/shop-actions';

const ProductNotFound = (props) => {
    return <>{props.isSearch && <h2 className={classes.notFoundTitle}>Sorry products not found please try again</h2>}</>
}

const ShopPage = () => {
    const shops = useSelector((state) => state.shop.items)
    const dispatch = useDispatch();
    console.log(shops);
    useEffect(() => {
        if (!shops.length) {
            dispatch(fetchShops(false));
        }
    }, []);

    const isVisibleCard = useSelector(state => state.ui.cartIsVisible);
    const isVisibleForm = useSelector(state => state.ui.formOrderIsVisible);
    const products = useSelector(state => state.product.items);
    const isSearch = useSelector(state => state.product.isSearch);
    return <div className={classes.content}>
        <SearchItem />
        {products.length ? <ProductItems products={products} isSearch={isSearch}/> : <ProductNotFound isSearch={isSearch}/>}
        {isVisibleCard && <CardOrder/>}
        {isVisibleForm && <FormOrder items={products} />}
    </div>
}

export default ShopPage;