import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card"
import SearchIcon from "./SearchIcon";
import classes from './SearchItem.module.css'
import { useState } from "react";
import { fetchProduct } from "../../store/actions/product-actions";

const SearchItem = () => {

    const dispatch = useDispatch();

    const submitProductData = (ev) => {
        ev.preventDefault()
        const shop = filterShop === 'All' ? '' : filterShop;
        dispatch(fetchProduct({ search: filterText, shop, minPrice: filterMin, maxPrice: filterMax }));
    }

    const [filterText, setfilterText] = useState('');
    const changeFilterTextHandler = (ev) => setfilterText(ev.target.value);
    const [filterShop, setFilterShop] = useState('');
    const changeFilterShopHandler = (ev) => setFilterShop(ev.target.value);
    const [filterMin, setFilterMin] = useState('')
    const changeFilterMinHandler = (ev) => setFilterMin(ev.target.value);
    const [filterMax, setFilterMax] = useState('')
    const changeFilterMaxHandler = (ev) => setFilterMax(ev.target.value);

    const shops = useSelector((state) => state.shop.items);
    return <Card>
        <form className={classes.formBox} onSubmit={submitProductData}>
            <div className={classes.searchBox}>
                <h2 className={classes.title}>Search</h2>
                <input type="text" className={classes.searchInput} onChange={changeFilterTextHandler} />
            </div>
            <div className={classes.filterBox}>
                {!!shops.length && <div className={`${classes.filterContent} ${classes.select}`}>
                    <label>Shop:</label>
                    <select onChange={changeFilterShopHandler}>
                        <option key={0}>All</option>
                        {shops.map((shop) => {
                            return <option key={shop._id}>{shop.name}</option>
                        })}
                    </select>
                </div>}
            <div className={classes.filterContent}>
                <label>Min:</label>
                <input type="number" min="1" onChange={changeFilterMinHandler} />
            </div>
            <div className={classes.filterContent}>
                <label>Max:</label>
                <input type="number" min="1" onChange={changeFilterMaxHandler} />
            </div>
        </div>
        <button type="submit" className={classes.btn}><SearchIcon width="20" heigth="20" /></button>

    </form>
    </Card >
}

export default SearchItem;