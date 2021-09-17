import React, { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {

    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((currentValue, item) => {
        return currentValue + item.amount;
    }, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{totalCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;