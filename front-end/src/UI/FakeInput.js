import { useState } from 'react'
import classes from './FakeInput.module.css'

const FakeInput = (props) => {
    const {
        children,
        isEdit = false,
        type = 'text',
        className = '',
        limitWord = 15,
        fontSize = 16,
        lst = ''
    } = props;
    const defaultValue = children;
    const [ enteredValue, setEnteredValue ] = useState(defaultValue)
    const valueChangeHandler = (event) => {
        const value = event.target.value;
        if (value.length > limitWord + lst.length) {
            return
        }
        setEnteredValue(value.replace(lst, ''))
    }
    const resetValue = () => {
        setEnteredValue(defaultValue.toString().replace(lst, ''))
    }
    let calcPixel = enteredValue.toString().length * (fontSize * 0.6) + 10;
    const width = `${calcPixel}px`
    const activeClass = isEdit ? classes.active : ''
    const nameClass = `${classes.fakeinput} ${activeClass} ${className}`
    return <input
        value={isEdit ? enteredValue : enteredValue + lst}
        onChange={valueChangeHandler}
        onReset={resetValue}
        className={nameClass}
        type={type}
        readOnly={!isEdit}
        defvalue={defaultValue + lst}
        style={{ width: width, fontSize }}>
    </input>
}

export default FakeInput;