import classes from './ManageItems.module.css'

import editImg from '../../static/image/pen-to-square-solid.svg'
import deleteImg from '../../static/image/trash-solid.svg'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';
import { editProduct, deleteProduct, deleteStoreToUser } from '../../store/actions/auth-actions';
import AddProductModal from '../Modal/AddProductModal';
import FakeInput from '../../UI/FakeInput';
import { createTempNotification } from '../../store/actions/notification-actions';


const ProductNotFound = (props) => {
    const { currentShop, addProductHandler } = props;

    const dispatch = useDispatch();

    const onClickDeleteStore = () => {
        dispatch(deleteStoreToUser({ shop: currentShop._id }));
    }
    return <div className={classes.msgBox}>
        <h2>Sorry you dont have products...</h2>
        <p>Occaecat ut pariatur id anim ea excepteur irure nisi officia excepteur non nostrud. Veniam id do ipsum commodo veniam est reprehenderit.</p>
        <div className={classes.buttonBox}>
            <button className={classes.btn} onClick={onClickDeleteStore}>Remove Store</button>
            <button className={classes.btn} onClick={addProductHandler}>Add Product</button>
        </div>
    </div>
}

const ProductItems = (props) => {
    const { products, currentShop, addProductHandler } = props;

    const dispatch = useDispatch();

    const onClickDeleteStore = () => {
        dispatch(deleteStoreToUser({ shop: currentShop._id }));
    }

    const onClickEditManageHandler = (productId, ev) => {
        const element = ev.target.closest(`.${classes.product}`)
        if (element) {
            const isActive = element.classList.contains(`${classes.active}`);
            if (!isActive) {
                onChangeProductHandler(element, isActive);
                return
            }
            onEditProductHandler(element, productId)
            return
        }
        console.error('Element not found')
    }
    const onClickDeleteManageHandler = (productId, ev) => {
        const element = ev.target.closest(`.${classes.product}`)
        if (element) {
            const isActive = element.classList.contains(`${classes.active}`);
            if (!isActive) {
                if (!productId) {
                    dispatch(createTempNotification({
                        title: 'Invalid productId',
                        message: 'ProductId is null',
                        status: 'error'
                    }))
                }
                dispatch(deleteProduct({
                    shop: currentShop._id,
                    productId
                }))
                return
            }
            onResetProductHandler(element)
            return
        }
        console.error('Element not found')
    }

    const onChangeProductHandler = (element, isActive = null) => {
        const fakeInputs = element.querySelectorAll('input');
        const removeIcon = element.querySelector(`.${classes.removeIcon}`);
        const editIcon = element.querySelector(`.${classes.editIcon}`);
        isActive = isActive == null
            ? element.classList.contains(`${classes.active}`)
            : isActive
        fakeInputs.forEach(input => {
            !isActive
                ? input.removeAttribute('readOnly')
                : input.setAttribute('readOnly', true)
        });
        if (!isActive) {
            element.classList.add(`${classes.active}`);
            removeIcon.classList.add(`${classes.active}`);
            editIcon.classList.add(`${classes.active}`);
        } else {
            element.classList.remove(`${classes.active}`);
            removeIcon.classList.remove(`${classes.active}`);
            editIcon.classList.remove(`${classes.active}`);
        }
    }
    const onEditProductHandler = (element, productId) => {
        const productName = element.querySelector(`.${classes.productTitle}`);
        const productPrice = element.querySelector(`.${classes.price}`);
        const isNull = !productName.value.length || !productPrice.value.length
        const [defName, defPrice] = [
            productName.getAttribute('defvalue'),
            productPrice.getAttribute('defvalue')
        ]
        const isDefValue = defName === productName.value &&
            defPrice === productPrice.value
        if (isNull || isDefValue) {
            dispatch(createTempNotification({
                title: 'Invalid value product',
                message: 'Product value is null or you can`t change value',
                status: 'error'
            }))
            return;
        }
        dispatch(editProduct({
            name: productName.value,
            price: productPrice.value.replace('$', ''),
            shop: currentShop._id,
            productId
        }))
        onChangeProductHandler(element);
        return;
    }
    const onResetProductHandler = (element) => {
        const productName = element.querySelector(`.${classes.productTitle }`);
        const productPrice = element.querySelector(`.${classes.price}`);
        productName.dispatchEvent(new Event('reset', { bubbles: true }));
        productPrice.dispatchEvent(new Event('reset', { bubbles: true }));
        onChangeProductHandler(element);
        return;
    }
    
    return <div className={classes.productBox}>
    <h2 className={classes.shopName}>{currentShop.name}</h2>
    <div className={classes.productList}>
            {products.map((product) =>
                <div className={classes.productBox} key={product._id}>
                    <div className={classes.product} >
                        <FakeInput className={classes.productTitle } limitWord={14} fontSize={18}>{product.name}</FakeInput>
                        <div className={classes.detailBox}>
                            <FakeInput className={classes.price} limitWord={6} fontSize={16} lst='$'>{product.price}</FakeInput>
                            <div className={`${classes.btn} ${classes.editIcon}`} onClick={(ev) => onClickEditManageHandler(product._id, ev)}></div>
                            <div className={`${classes.btn} ${classes.removeIcon}`} onClick={(ev) => onClickDeleteManageHandler(product._id, ev)}></div>
                        </div>
                    </div>
                </div>
            )}
    </div>
    <div className={classes.buttonBox}>
        <div className={`${classes.btn} ${classes.remove}`} onClick={onClickDeleteStore}>Remove Store<img src={deleteImg} alt=''></img></div>
        <div className={`${classes.btn} ${classes.create}`} onClick={addProductHandler}>Add Product<img src={editImg} alt=''></img></div>
    </div>
</div>
}

const ManageItems = (props) => {
    const [ searchParam ] = useSearchParams();
    const dispath = useDispatch();
    const { addProductIsVisible } = useSelector((state) => state.ui);
    const isProductForm = () => dispath(uiAction.enable(
        uiConstantIsVisible.addProductIsVisible
    ));
    const isStoreForm = () => dispath(uiAction.toggle(
        uiConstantIsVisible.addStoreIsVisible
    ));
    const { shops, maxShops } = props;
    const shopsName = shops.map((value) => value.name)
    const paramShop = searchParam.get('shop')
    let currentShopName = paramShop && shopsName.includes(paramShop)
    ? paramShop
    : shopsName[0]
    const currentShop = shops.find(shop => shop.name === currentShopName);
    

    return <>
        <div className={classes.manageBox}>
            <nav className={classes.shopList}>
                {shopsName.map((name, index) => {
                    const current = currentShopName === name;
                    return <div className={`${classes.shopName} ${current ? classes.current : ''}`} key={index}><Link to={`/manage?shop=${name}`}>{name}</Link></div>
                })}
                {maxShops === shops.length || <div className={classes.addShop} onClick={isStoreForm}>Add Store</div>}
            </nav>
            {currentShop.products.length
                ? <ProductItems products={currentShop.products} currentShop={currentShop} addProductHandler={isProductForm} />
                : <ProductNotFound addProductHandler={isProductForm} currentShop={currentShop}/>
            }

        </div>
        {addProductIsVisible && <AddProductModal currentShop={currentShop} />}
    </>
}

export default ManageItems;