import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {

    const [bumpAnimation, setBumpAnimation] = useState(false);

    const cartCtx = useContext(CartContext);    
    const { items } = cartCtx;

    const totalCartItems = items.reduce((currentValue, item) => {
        return currentValue + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${bumpAnimation ? classes.bump : ''}`;

    useEffect(() => {
        if (items === 0) {
            return;
        }
        setBumpAnimation(true);

        const timer = setTimeout(() => {
            setBumpAnimation(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };  
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{totalCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;