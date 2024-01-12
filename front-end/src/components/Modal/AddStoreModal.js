import Modal from '../../UI/Modal'
import useInput from "../../hook/useInput";
import { addShopToUser, fetchUserInfo } from '../../store/actions/auth-actions';
import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';
import classes from './AddStoreModal.module.css'
import { useDispatch } from 'react-redux';

const AddStoreModal = () => {
    const dispath = useDispatch();
    const isVisibleForm = () => dispath(uiAction.toggle(
        uiConstantIsVisible.addStoreIsVisible
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
        value: valueDescription,
        isValidInput: isValidDescription,
        arrayError: arrayErrorDescription,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        resetFn: resetDescription
    } = useInput(isNotEmptyFn, 'Description');

    const validForm = isValidName && isValidDescription
    const submitHandler = (ev) => {
        ev.preventDefault();
        if (validForm) {
            dispath(addShopToUser({
                name: valueName,
                description: valueDescription
            }));
            resetName();
            resetDescription();
            dispath(fetchUserInfo())
            dispath(uiAction.disabled(uiConstantIsVisible.addStoreIsVisible))
        }
    }
    return <Modal onHiddenCart={isVisibleForm}>
        <form className={classes.content} onSubmit={submitHandler}>
            <h2>Add Store</h2>
            <div className={classes.formBox}>
            <input type="text" onInput={nameChangeHandler} onBlur={nameBlurHandler} name="name" placeholder="Name" className={`${arrayErrorName.length ? classes.errorInput : ''}`} value={valueName} />
                <textarea name="description" onInput={descriptionChangeHandler} onBlur={descriptionBlurHandler} className={`${arrayErrorDescription.length ? classes.errorInput : ''}`} type='text' placeholder='Description...' value={valueDescription}></textarea>
            </div>
                <div className={classes.buttonBox}>
                    <button className={`${classes.btn} ${classes.close}`} onClick={isVisibleForm}>Close</button>
                    <button type='submit' className={`${classes.btn} ${classes.add}`} disabled={!validForm}>Add Store</button>
                </div>
        </form>
    </Modal>
}

export default AddStoreModal;