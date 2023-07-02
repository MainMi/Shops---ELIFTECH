import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.inputBox}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} className={classes.input} {...props.input}/>
        </div>
    );
})

export default Input;