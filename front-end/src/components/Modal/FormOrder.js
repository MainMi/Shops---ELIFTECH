import { useDispatch, useSelector } from "react-redux";

import Modal from "../../UI/Modal"
import { uiAction, uiConstantIsVisible } from "../../store/ui-slice";
import classes from "./FormOrder.module.css";
import useInput from "../../hook/useInput";
import { regex } from "../../constant/regex.enum";
import useHttp from "../../hook/useHttp";
import urlEnum from "../../constant/urlEnum";



const isNotEmptyFn = (value) => value.trim() === '' ? ['emptyError'] : []

const isEmailFn = (value) => {
    const regexEmail = new RegExp(regex.REGEX_EMAIL);
    return !regexEmail.test(value) ? ['emailError'] : []
}

const isPhoneFn = (value) => {
    const regexPhone = new RegExp(regex.REGEX_PHONE);
    return !regexPhone.test(value) ? ['phoneError'] : []
}

const showErrorMsg = (arr) => {
    if (arr.length === 0) {
        return
    }
    return arr.map((value, index) => {
        return <p className={classes.errorMsg} key={index}>{value}</p>
    })
}


const FormOrder = (props) => {

    const { items, totalPrice } = useSelector(state => state.card);
    const userInfo = useSelector(state => state.auth.userInfo);
    const {
        email: initialEmail = '',
        fullname: initialFullname = '',
        nickname: initialNickname = '',
        phone: initialPhone = '',
        address: initialAddress = '' 
    } = userInfo;
    const sendRequest = useHttp();

    const userToken = useSelector(state => state.auth.userToken);

    const product = items.map(vl => vl.id)

    const [ FirstName = '', LastName = initialNickname ] = initialFullname.split(' ');

    const {
        value: valueName,
        isValidInput: isValidName,
        arrayError: arrayErrorName,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        resetFn: resetName
    } = useInput(isNotEmptyFn, 'FirstName', FirstName);

    const {
        value: valueLastName,
        isValidInput: isValidLastName,
        arrayError: arrayErrorLastName,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        resetFn: resetLastName
    } = useInput(isNotEmptyFn, 'LastName', LastName);

    const {
        value: valueEmail,
        isValidInput: isValidEmail,
        arrayError: arrayErrorEmail,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetFn: resetEmail
    } = useInput((value) => {
        const arrValidEmpty = isNotEmptyFn(value)
        const arrValidEmail = isEmailFn(value);
        return [...arrValidEmpty, ...arrValidEmail]
    }, 'Email', initialEmail);

    const {
        value: valuePhone,
        isValidInput: isValidPhone,
        arrayError: arrayErrorPhone,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        resetFn: resetPhone
    } = useInput((value) => {
        const arrValidEmpty = isNotEmptyFn(value)
        const arrValidPhone = isPhoneFn(value);
        return [...arrValidEmpty, ...arrValidPhone]
    }, 'Phone', initialPhone);
    const {
        value: valueAddress,
        isValidInput: isValidAddress,
        arrayError: arrayErrorAddress,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        resetFn: resetAddress
    } = useInput(isNotEmptyFn, 'Address', initialAddress);

    const formInActive = isValidName
        && isValidLastName
        && isValidEmail
        && isValidPhone
        && isValidAddress

    const submitHandler = (ev) => {
        ev.preventDefault();
        if (!formInActive) {
            return;
        }


        const dataSend = {
            name: valueName,
            lastName: valueLastName,
            address: valueAddress,
            email: valueEmail,
            phone: valuePhone,
            price: totalPrice,
            product
        }

        resetName();
        resetLastName();
        resetEmail();
        resetPhone();
        resetAddress();

        const headers = userToken ? { 'Authorization': userToken } : {};
        sendRequest({
            URL: urlEnum.sendOrder,
            method: 'POST',
            headers,
            body: dataSend
        })



    }



    const dispath = useDispatch();
    const isHiddenCart = () => dispath(uiAction.toggle(uiConstantIsVisible.formOrderIsVisible));
    // const [ cookies, setCookie ] = useCookies(['uuid-user']);
    return <Modal onHiddenCart={isHiddenCart} >
        <div className={classes.content}>
            <form className={classes.formBox} onSubmit={submitHandler}>
                <div className={classes.formHeader}>
                    <h3>Order</h3>
                    {!FirstName.length ? '' : <h4>{initialFullname}({initialNickname})</h4>}
                </div>
                <div className={classes.formMain}>
                    <div className={classes.labelBox}>
                        <label className={classes.labelText} htmlFor="firstname" >FirstName:</label>

                        <input type="text" onInput={nameChangeHandler} onBlur={nameBlurHandler} name="firstname" placeholder="Enter First name" className={`${arrayErrorName.length ? classes.errorInput : ''}`} value={valueName} />
                        {showErrorMsg(arrayErrorName)}
                    </div>
                    <div className={classes.labelBox}>

                        <label className={classes.labelText} htmlFor="lastname">LastName:</label>

                        <input onInput={lastNameChangeHandler} onBlur={lastNameBlurHandler} type="text" name="lastname"
                            placeholder="Enter Last Name" className={`${arrayErrorLastName.length ? classes.errorInput : ''}`} value={valueLastName} />
                        {showErrorMsg(arrayErrorLastName)}

                    </div>
                    <div className={classes.labelBox}>

                        <label className={classes.labelText} htmlFor="email">Email:</label>

                        <input type="text" name="email" onInput={emailChangeHandler} onBlur={emailBlurHandler} className={`${arrayErrorEmail.length ? classes.errorInput : ''}`} placeholder="Enter email" value={valueEmail} />
                        {showErrorMsg(arrayErrorEmail)}

                    </div>
                    <div className={classes.labelBox}>

                        <label className={classes.labelText} htmlFor="address">Address:</label>

                        <input type="text" name="address" onInput={addressChangeHandler} onBlur={addressBlurHandler} className={`${arrayErrorPhone.length ? classes.errorInput : ''}`} placeholder="Enter phone number" value={valueAddress} />
                        {showErrorMsg(arrayErrorAddress)}

                    </div>
                    <div className={classes.labelBox}>

                        <label className={classes.labelText} htmlFor="phone">Phone:</label>

                        <input type="text" name="phone" onInput={phoneChangeHandler} onBlur={phoneBlurHandler} className={`${arrayErrorPhone.length ? classes.errorInput : ''}`} placeholder="Enter address number" value={valuePhone} />
                        {showErrorMsg(arrayErrorPhone)}

                    </div>
                </div>
                <div className={classes.orderBox}>
                    <h2>Total:</h2>
                    <div className={classes.price}>{totalPrice}$</div>
                    <div className={classes.buttonBox}>
                        <button className={`${classes.btn} ${classes.close}`} onClick={isHiddenCart}>Cancel</button>
                        <button className={classes.btn} disabled={!formInActive} onClick={submitHandler}>Order</button>
                    </div>
                </div>
            </form>

        </div>
    </Modal>
}

export default FormOrder;