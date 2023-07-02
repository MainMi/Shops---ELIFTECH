import { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onHiddenCart}></div>
}

const ModalOverlays = (props) => {
    return <Fragment>
        <div className={classes.modal}>
            {props.children}
        </div>
    </Fragment>
}
const overlays = document.getElementById('overlays');
const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onHiddenCart={props.onHiddenCart}/>, overlays)}
        {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>, overlays)}
    </Fragment>
}
export default Modal;