import { useDispatch, useSelector } from 'react-redux';
import classes from './ProfilePage.module.css'
import { useState } from 'react';

import minusImg from '../static/image/minus-solid.svg';
import plusImg from '../static/image/plus-solid.svg';
import useInput from '../hook/useInput';
import validateFn from '../constant/validateFn.enum';
import { showErrorMsg } from '../error/error.validate.msg';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { memo } from 'react';
import { updateUser } from '../store/actions/auth-actions';

const OrderItems = memo((props) => {
    const { orders, index } = props
    if (!orders || !orders.length) {
        return <p>You dont have any orders</p>
    }
    const maxCountArr = index * 3 > orders.length ? orders.length : index * 3;
    const sortedOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice((index - 1) * 3, maxCountArr);
    return sortedOrders.map((value, index, arr) => {
        const date = new Date(value.createdAt);
        const optionsDate = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formatDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
        const firstShop = arr[index].product[0].shop.name;
        return <div className={classes.order} key={value._id}>
            <h4>{firstShop}</h4>
            <div className={classes.detailBox}>
                <div className={classes.price}>{value.price}$</div>
                <div>{formatDate}</div>
            </div>
        </div>
    })
    
})

const ProfilePage = () => {
    const dispath = useDispatch();
    const userInfo = useSelector(state => state.auth.userInfo);
    const {
        nickname = '',
        fullname = '',
        address = '',
        email = '',
        phone = '',
        role = '',
        orders = ''
    } = userInfo;
    let {
        value: valueNickname,
        isValidInput: isValidNickname,
        arrayError: arrayErrorNickname,
        valueChangeHandler: nicknameChangeHandler,
        inputBlurHandler: nicknameBlurHandler,
    } = useInput(validateFn.isNotEmptyFn, 'Nickname');
    
    let {
        value: valuePhone,
        isValidInput: isValidPhone,
        arrayError: arrayErrorPhone,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
    } = useInput(validateFn.isPhoneFn, 'Phone');
    let {
        value: valueAddress,
        isValidInput: isValidAddress,
        arrayError: arrayErrorAddress,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
    } = useInput(() => [], 'Address');
    
    
    
    const [ index, setIndex ] = useState(1);
    
    const [ isEdit, setIsEdit ] = useState(false);

    useEffect(() => {
        nicknameChangeHandler({ target: { value: nickname } });
        phoneChangeHandler({ target: { value: phone } });
        addressChangeHandler({ target: { value: address } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nickname, phone, address]);


    const editClickHandler = () => {
        if (isEdit) {
            nicknameChangeHandler({ target: { value: nickname } });
            phoneChangeHandler({ target: { value: phone } });
            addressChangeHandler({ target: { value: address } });
        }
        setIsEdit((prevState) => !prevState)
    }

    
    const isPrevNickname = valueNickname !== nickname
    const isPrevPhone = valuePhone !== phone
    const isPrevAddress = valueAddress !== address && valueAddress.length
    
    const isPrevData = isPrevNickname
        || isPrevPhone
        || isPrevAddress
    const validDataForm = isPrevData
        && isValidAddress
        && isValidPhone
        && isValidNickname
        && isEdit;
    
    const clickSubmitHandler = (ev) => {
        ev.preventDefault()
        if (!validDataForm) {
            return
        }
        let formData = {};
        if (isPrevNickname) {
            formData.nickname = valueNickname
        }
        if (isPrevPhone) {
            formData.phone = valuePhone
        }
        if (isPrevAddress) {
            formData.address = valueAddress
        }
        if (Object.values(formData).length) {
            dispath(updateUser(formData))
        }
    }

    const maxIndexLimit = Math.ceil(orders.length / 3) < 1 ? 1 : Math.ceil(orders.length / 3);
    const changeIndexHandler = useCallback(
        (add = false) => () => {
            if (!add) {
                if (index - 1 === 0) {
                    return;
                }
                setIndex((oldIndex) => oldIndex - 1);
                return;
            }
            if (index + 1 > maxIndexLimit) {
                return;
            }
            setIndex((oldIndex) => oldIndex + 1);
            return;
        },
        [index, maxIndexLimit]
    );
    if (!userInfo.email) {
        return <div></div>
    }
    

    return <div className={classes.content}>
        <div className={classes.profileBox}>
            <header className={classes.profileHeader}>
                <h2>{fullname}({nickname})</h2>
                <h3>{role}</h3>
            </header>
            <div className={classes.profileContent}>
                <form className={classes.userInfo}>
                    <h3>Your Info:</h3>
                    <div className={classes.userInput}>
                        <label>Nickname:</label>
                        <input 
                        onInput={nicknameChangeHandler}
                        onBlur={nicknameBlurHandler}
                        value={valueNickname}
                        type='text'
                        readOnly={!isEdit}>
                        </input>
                        {showErrorMsg(arrayErrorNickname, classes.errorMsg)}
                    </div>
                    <div className={classes.userInput}>
                        <label>Gmail:</label>
                        <input value={email} type='email' readOnly={true}></input>
                    </div>
                    <div className={classes.userInput}>
                        <label>Phone:</label>
                        <input 
                        onInput={phoneChangeHandler}
                        onBlur={phoneBlurHandler}
                        value={valuePhone}
                        type='text'
                        readOnly={!isEdit}>
                        </input>
                        {showErrorMsg(arrayErrorPhone, classes.errorMsg)}
                    </div>
                    <div className={classes.userInput}>
                        <label>Address:</label>
                        <input 
                        onInput={addressChangeHandler}
                        onBlur={addressBlurHandler}
                        value={valueAddress}
                        type='text'
                        readOnly={!isEdit}>
                        </input>
                        {showErrorMsg(arrayErrorAddress, classes.errorMsg)}
                    </div>
                    <div className={classes.buttonBox}>
                        <button className={classes.btn} onClick={editClickHandler} type='button'>{!isEdit ? 'Edit' : 'Cancel'}</button>
                        <button className={`${classes.btn} ${classes.save}`} disabled={!validDataForm} type='submit' onClick={clickSubmitHandler}>Save</button>
                    </div>
                </form>
                <div className={classes.orderInfo}>
                    <h3>Your Order:</h3>
                    <OrderItems orders={orders} index={index} />
                    <div className={classes.buttonBox}>
                        <div className={classes.btn} onClick={changeIndexHandler(true)}><img src={plusImg} alt='+' /></div>
                        <div className={`${classes.btn} ${classes.counter}`}>{index}/{maxIndexLimit}</div>
                        <div className={classes.btn} onClick={changeIndexHandler()}><img src={minusImg} alt='-'/></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ProfilePage;