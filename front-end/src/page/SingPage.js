import { useSearchParams, Link } from 'react-router-dom'
import classes from './SingPage.module.css'
import useInput from '../hook/useInput';
import { validateFn } from '../constant/validateFn.enum';
import { showErrorMsg } from '../error/error.validate.msg';
import { useDispatch } from 'react-redux';
import { fetchLogin, fetchRegister } from '../store/actions/auth-actions';

const SingPage = () => {

    let {
        value: valuePassword,
        isValidInput: isValidPassword,
        arrayError: arrayErrorPassword,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => {
        const arrValidEmpty = validateFn.isNotEmptyFn(value)
        const arrValidPassword = validateFn.isPasswordFn(value);
        return [...arrValidEmpty, ...arrValidPassword]
    }, 'Password');

    let {
        value: valueEmail,
        isValidInput: isValidEmail,
        arrayError: arrayErrorEmail,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => {
        const arrValidEmpty = validateFn.isNotEmptyFn(value)
        const arrValidEmail = validateFn.isEmailFn(value);
        return [...arrValidEmpty, ...arrValidEmail]
    }, 'Email');

    let {
        value: valueFullname,
        isValidInput: isValidFullname,
        arrayError: arrayErrorFullname,
        valueChangeHandler: fullnameChangeHandler,
        inputBlurHandler: fullnameBlurHandler,
    } = useInput(validateFn.isNotEmptyFn, 'Fullname');
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
    } = useInput((value) => {
        return value.length ? validateFn.isPhoneFn(value) : []
    }, 'Phone');

    const [ searchParam ] = useSearchParams();
    const isLogin = searchParam.get('mode') === 'singIn';
    const containerClass = `${classes.container} ${isLogin ? classes.singIn : ''}`;

    const loginInActive = isValidEmail && isValidPassword
    const validPhone = valuePhone.length === 0 ? true : isValidPhone;
    const registerInActive = loginInActive && isValidEmail && isValidNickname && validPhone && isValidFullname

    const dispatch = useDispatch();
    const registerSubmitHandler = (ev) => {
        ev.preventDefault()
        if (!registerInActive) {
            return;
        }
        dispatch(fetchRegister({
            fullname: valueFullname,
            nickname: valueNickname,
            email: valueEmail,
            phone: valuePhone.length ? valuePhone : undefined, 
            password: valuePassword
        }))
    }
    const loginSubmitHandler = async (ev) => {
        ev.preventDefault()
        if (!loginInActive) {
            return;
        }
        dispatch(fetchLogin({ email: valueEmail, password: valuePassword }));
    }

    
    return <div className={containerClass}>
        <div className={classes.content}>
            <div className={`${classes.box} ${classes.singInBx}`}>
                <h2>You dont have account</h2>
                <Link to={'/sing?mode=singUp'}>SingUp</Link>
            </div>
            <div className={`${classes.box} ${classes.singUpBx}`}>
                <h2>You already have account</h2>
                <Link to={'/sing?mode=singIn'}>SingIn</Link>
            </div>
            
            <div className={classes.formBx}>
                <form className={`${classes.contentForm} ${classes.singInBx}`} onSubmit={loginSubmitHandler}>
                    <h2>Login</h2>
                    <input
                        type='text'
                        value={valueEmail}
                        onInput={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        name="email"
                        placeholder='Enter email...'
                    />
                    {showErrorMsg(arrayErrorEmail, classes.errorMsg)}
                    <input
                        type='password'
                        value={valuePassword}
                        onInput={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        name="password"
                        placeholder='Enter password...'
                    />
                    {showErrorMsg(arrayErrorPassword, classes.errorMsg)}
                    <button className={classes.submitBtn} disabled={!loginInActive} type='submit'>Login</button>
                    <p>You dont have account</p><Link to={'/sing?mode=singIn'}>SingIn</Link>
                </form>
                <form className={`${classes.contentForm} ${classes.singUpBx}`} onSubmit={registerSubmitHandler}>
                    <h2>Register</h2>
                    <input 
                        type='text'
                        onInput={fullnameChangeHandler}
                        onBlur={fullnameBlurHandler}
                        name="fullname"
                        placeholder='Enter fullname...'/>
                    {showErrorMsg(arrayErrorFullname, classes.errorMsg)}
                    <input 
                        type='text'
                        onInput={nicknameChangeHandler}
                        onBlur={nicknameBlurHandler}
                        name="nickname"
                        placeholder='Enter nickname...'/>
                    {showErrorMsg(arrayErrorNickname, classes.errorMsg)}
                    <input
                        type='text'
                        value={valueEmail}
                        onInput={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        name="email"
                        placeholder='Enter email...'
                        />
                    {showErrorMsg(arrayErrorEmail, classes.errorMsg)}
                    <input
                        type='phone'
                        onInput={phoneChangeHandler}
                        onBlur={phoneBlurHandler}
                        name="phone"
                        placeholder='Enter phone(not required)...'
                    />
                    {showErrorMsg(arrayErrorPhone, classes.errorMsg)}
                    <input
                        type='password'
                        value={valuePassword}
                        onInput={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        name="password"
                        placeholder='Enter password...'
                    />
                    {showErrorMsg(arrayErrorPassword, classes.errorMsg)}
                    <button className={classes.submitBtn} disabled={!registerInActive} type='submit'>Register</button>
                    <p>You already have account </p><Link to={'/sing?mode=singUp'}>SingUp</Link>
                </form>
            </div>
        </div>
    </div>
}

export default SingPage;