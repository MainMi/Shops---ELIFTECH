import Modal from '../../UI/Modal'
import useInput from '../../hook/useInput';
import { addProductToUser, fetchUserInfo } from '../../store/actions/auth-actions';
import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';
import classes from './AddProductModal.module.css'
import { useDispatch } from 'react-redux';



const AddProductModal = (props) => {
    const { currentShop } = props;
    const dispath = useDispatch();
    const isVisibleForm = () => dispath(uiAction.toggle(
        uiConstantIsVisible.addProductIsVisible
        ));
    
    const isNotEmptyFn = (value) => value.trim() === '' ? ['emptyError'] : []
    const {
        value: valueName,
        isValidInput: isValidName,
        arrayError: arrayErrorName,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        resetFn: resetName
    } = useInput(isNotEmptyFn, 'Name');
    const {
        value: valuePrice,
        isValidInput: isValidPrice,
        arrayError: arrayErrorPrice,
        valueChangeHandler: priceChangeHandler,
        inputBlurHandler: priceBlurHandler,
        resetFn: resetPrice
    } = useInput(isNotEmptyFn, 'Price');

    const {
        value: valueDescription,
        isValidInput: isValidDescription,
        arrayError: arrayErrorDescription,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        resetFn: resetDescription
    } = useInput(isNotEmptyFn, 'Description');

    const validForm = isValidName && isValidDescription && isValidPrice
    const submitHandler = (ev) => {
        ev.preventDefault();
        if (validForm) {
            dispath(addProductToUser({
                name: valueName,
                price: valuePrice,
                description: valueDescription,
                shop: currentShop._id
            }));
            resetName();
            resetPrice();
            resetDescription();
            dispath(fetchUserInfo())
            dispath(uiAction.disabled(uiConstantIsVisible.addProductIsVisible))
        }
    }
    return <Modal onHiddenCart={isVisibleForm}>
        <form className={classes.content} onSubmit={submitHandler}>
            <h2>Add Price</h2>
            <div className={classes.formBox}>
                <input type="text" onInput={nameChangeHandler} onBlur={nameBlurHandler} name="name" placeholder="Name" className={`${arrayErrorName.length ? classes.errorInput : ''}`} value={valueName} />
                <input type="number" min='1' max='999999' onInput={priceChangeHandler} onBlur={priceBlurHandler} name="price" placeholder="Price" className={`${arrayErrorPrice.length ? classes.errorInput : ''}`} value={valuePrice} />
                <textarea name="description" onInput={descriptionChangeHandler} onBlur={descriptionBlurHandler} className={`${arrayErrorDescription.length ? classes.errorInput : ''}`} type='text' placeholder='Description...' value={valueDescription}></textarea>
            </div>
            <div className={classes.buttonBox}>
                <button className={`${classes.btn} ${classes.close}`} onClick={isVisibleForm}>Close</button>
                <button className={`${classes.btn} ${classes.add}`} onClick={() => {}} disabled={!validForm}>Add Price</button>
            </div>
        </form>
    </Modal>
}

export default AddProductModal;