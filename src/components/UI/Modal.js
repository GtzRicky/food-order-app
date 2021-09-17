import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = props => {
    return (
        <div className={classes.backdrop} onClick={props.close}></div>
    );
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};
const Modal = props => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop close={props.onClose}/>, document.getElementById('overlays'))}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
        </React.Fragment>
    );
};

export default Modal;