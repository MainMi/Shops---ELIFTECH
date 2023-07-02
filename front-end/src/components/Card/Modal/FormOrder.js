import { useDispatch, useSelector } from "react-redux";
import { useCookies } from 'react-cookie';

import Modal from "../../UI/Modal"
import { uiAction, uiConstantIsVisible } from "../../store/ui-slice";
import classes from "./FormOrder.module.css";
import useInput from "../../hook/useInput";
import { regex } from "../../constant/regex.enum";
import useHttp from "../../hook/useHttp";
import { urlEnum } from "../../constant/urlEnum";



const isNotEmptyFn = (value) => value.trim() === '' ? ['emptyError'] : []
const isDataFn = (value, type) => {
    switch (type) {
        case 'day':
            return value < 1 || value > 31 ? ['dataError'] : []
        case 'month':
            return value < 1 || value > 12 ? ['dataError'] : []
        case 'year':
            return value < 1920 || value > 2023 ? ['dataError'] : []
        default:
            console.error('Incorrect type')
            break;
    }
}

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

    const totalPrice = useSelector(state => state.card.totalPrice);
    const product = props.items.map(value => {
        return value._id
    })

    const sendRequest = useHttp();

    const {
        value: valueName,
        isValidInput: isValidName,
        arrayError: arrayErrorName,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        resetFn: resetName
    } = useInput(isNotEmptyFn, 'FirstName');

    const {
        value: valueLastName,
        isValidInput: isValidLastName,
        arrayError: arrayErrorLastName,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        resetFn: resetLastName
    } = useInput(isNotEmptyFn, 'LastName');

    const {
        value: valueDay,
        isValidInput: isValidDay,
        arrayError: arrayErrorDay,
        valueChangeHandler: dayChangeHandler,
        inputBlurHandler: dayBlurHandler,
        resetFn: resetDay
    } = useInput((value) => {
        const arrValidEmpty = isNotEmptyFn(value)
        const arrValidData = isDataFn(value, 'day');
        return [...arrValidEmpty, ...arrValidData]
    }, 'Day');

    const {
        value: valueMonth,
        isValidInput: isValidMonth,
        arrayError: arrayErrorMonth,
        valueChangeHandler: monthChangeHandler,
        inputBlurHandler: monthBlurHandler,
        resetFn: resetMonth
    } = useInput((value) => {
        const arrValidEmpty = isNotEmptyFn(value)
        const arrValidData = isDataFn(value, 'month');
        return [...arrValidEmpty, ...arrValidData]
    }, 'Month');

    const {
        value: valueYear,
        isValidInput: isValidYear,
        arrayError: arrayErrorYear,
        valueChangeHandler: yearChangeHandler,
        inputBlurHandler: yearBlurHandler,
        resetFn: resetYear
    } = useInput((value) => {
        const arrValidEmpty = isNotEmptyFn(value)
        const arrValidData = isDataFn(value, 'year');
        return [...arrValidEmpty, ...arrValidData]
    }, 'Year');

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
    }, 'Email');

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
    }, 'Phone');

    const formInActive = isValidName
        && isValidLastName
        && isValidDay
        && isValidMonth
        && isValidYear
        && isValidEmail
        && isValidPhone

    const submitHandler = (ev) => {
        ev.preventDefault();
        if (!formInActive) {
            return;
        }
        resetName();
        resetLastName();
        resetDay();
        resetMonth();
        resetYear();
        resetEmail();
        resetPhone();

        const date = new Date(valueYear,valueMonth,valueDay)

        const dataSend = {
            name: valueName,
            lastName: valueLastName,
            date,
            email: valueEmail,
            phone: valuePhone,
            price: totalPrice,
            product
        }

        sendRequest({
            URL: urlEnum.sendOrder,
            method: 'POST',
            body: dataSend
        })

        
    }



    const dispath = useDispatch();
    const isHiddenCart = () => dispath(uiAction.toggle(uiConstantIsVisible.formOrderIsVisible));
    // const [ cookies, setCookie ] = useCookies(['uuid-user']);
    return <Modal onHiddenCart={isHiddenCart} >
        <div className={classes.content}>
            <form className={classes.formBox} onSubmit={submitHandler}>
                <h3>Order</h3>
                <div className={classes.labelBox}>
                    <label className={classes.labelText} htmlFor="firstname" >First Name</label>

                    <input type="text" onInput={nameChangeHandler} onBlur={nameBlurHandler} name="firstname" placeholder="Enter First name" className={`${arrayErrorName.length ? classes.errorInput : ''}`} value={valueName} />
                    {showErrorMsg(arrayErrorName)}
                </div>
                <div className={classes.labelBox}>

                    <label className={classes.labelText} htmlFor="lastname">Last Name</label>

                    <input onInput={lastNameChangeHandler} onBlur={lastNameBlurHandler} type="text" name="lastname"
                        placeholder="Enter Last Name" className={`${arrayErrorLastName.length ? classes.errorInput : ''}`} value={valueLastName} />
                    {showErrorMsg(arrayErrorLastName)}

                </div>
                <div className={classes.dataBox}>
                    <div className={classes.labelBox}>

                        <label className={classes.labelText} htmlFor="day">Day</label>

                        <input type="number" name="day" onInput={dayChangeHandler} onBlur={dayBlurHandler} className={`${arrayErrorDay.length ? classes.errorInput : ''}`} min="1" max="31" placeholder="Day" value={valueDay} />
                        {showErrorMsg(arrayErrorDay)}

                    </div>
                    <div className={classes.labelBox}>
                        <label className={classes.labelText} htmlFor="mounday">Month</label>
                        <input type="number" name="mounday" onInput={monthChangeHandler} onBlur={monthBlurHandler} className={`${arrayErrorMonth.length ? classes.errorInput : ''}`} min="1" max="12" placeholder="Month" value={valueMonth} />
                        {showErrorMsg(arrayErrorMonth)}
                    </div>
                    <div className={classes.labelBox}>

                        <label className={classes.labelText} htmlFor="year">Year</label>

                        <input type="number" name="year" onInput={yearChangeHandler} onBlur={yearBlurHandler} className={`${arrayErrorYear.length ? classes.errorInput : ''}`} min="1920" placeholder="Year" value={valueYear} />
                        {showErrorMsg(arrayErrorYear)}

                    </div>
                </div>
                <div className={classes.labelBox}>

                    <label className={classes.labelText} htmlFor="email">Email</label>

                    <input type="text" name="email" onInput={emailChangeHandler} onBlur={emailBlurHandler} className={`${arrayErrorEmail.length ? classes.errorInput : ''}`} placeholder="Enter email" value={valueEmail} />
                    {showErrorMsg(arrayErrorEmail)}

                </div>
                <div className={classes.labelBox}>

                    <label className={classes.labelText} htmlFor="phone">Phone</label>

                    <input type="text" name="phone" onInput={phoneChangeHandler} onBlur={phoneBlurHandler} className={`${arrayErrorPhone.length ? classes.errorInput : ''}`} placeholder="Enter phone number" value={valuePhone} />
                    {showErrorMsg(arrayErrorPhone)}

                </div>
            </form>
            <div className={classes.orderBox}>
                <h2>Total:</h2>
                <div className={classes.collumBox}>
                    <p>1 item per bag</p>
                    <div>$ {totalPrice}</div>
                </div>
                <div className={classes.collumBox}>
                    <p>Cost of delivery</p>
                    <p>Depend out Shop</p>
                </div>
                <div className={classes.collumBox}>
                    <p>Before payment</p>
                    <div>$ {totalPrice}</div>
                </div>
                <button className={classes.btn} disabled={!formInActive} onClick={submitHandler}>Confirm order</button>
            </div>
        </div>
    </Modal>
}

export default FormOrder;